import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import Signup from ".";
import createServer from "../../utils/test/createServer";
import { BASE_URL } from "../../constants/services";

const navigate = jest.fn() as jest.Mock;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigate,
}));

const renderComponent = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });

  render(
    // @ts-ignore
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const { handleCreateErrorConfig } = createServer([
  {
    method: "post",
    url: `${BASE_URL}/auth/signin`,
    res() {
      return {
        token: "1234567890",
      };
    },
  },
  {
    url: `${BASE_URL}/users/me`,
    res() {
      return {
        data: {
          id: 1,
        },
      };
    },
  },
]);

test("Render content of Signup page correctly", () => {
  renderComponent();

  const pageTitle = screen.getByRole("heading", { name: /Create a new account/i });

  const firstNameInput = screen.getByPlaceholderText(/first name/i);
  const lastNameInput = screen.getByPlaceholderText(/last name/i);
  const middleNameInput = screen.getByPlaceholderText(/middle name/i);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const phoneInput = screen.getByPlaceholderText(/phone number/i);
  const phoneInputInfo = screen.getByText(/This would be your account number/i); // TODO: uncomment this line after adding this text to the page
  const passwordInput = screen.getByPlaceholderText(/enter 6 digits login passcode/i);

  const clickToAgree = screen.getByRole("checkbox", { name: /click .confirm. to accept/i });
  const termsAndConditions = screen.getByRole("link", { name: /terms and conditions./i });

  const confirmButton = screen.getByRole("button", { name: /confirm/i });

  const goToSignin = screen.getByRole("link", { name: /already have an account\? sign in/i });
  expect(goToSignin).toHaveAttribute("href", "/auth/signin");

  expect(goToSignin).toHaveAttribute("href", "/auth/signin");

  const Elements = [
    pageTitle,
    firstNameInput,
    lastNameInput,
    middleNameInput,
    emailInput,
    phoneInput,
    phoneInputInfo,
    passwordInput,
    clickToAgree,
    termsAndConditions,
    confirmButton,
    goToSignin,
  ];

  for (let element of Elements) {
    expect(element).toBeInTheDocument();
  }
});

const handleAssertTypeInForm = async (
  user: ReturnType<typeof userEvent.setup>,
  formData: {
    phone: string;
    loginPasscode: string;
    email: string;
    middleName: string;
    lastName: string;
    firstName: string;
  }
) => {
  const phoneInput = screen.getByPlaceholderText(/phone number/i);
  const loginPasscodeInput = screen.getByPlaceholderText(/enter 6 digits login passcode/i);
  const email = screen.getByPlaceholderText(/email/i);
  const middleName = screen.getByPlaceholderText(/middle name/i);
  const lastName = screen.getByPlaceholderText(/last name/i);
  const firstName = screen.getByPlaceholderText(/first name/i);
  const check = screen.getByRole("checkbox");

  await user.type(phoneInput, formData.phone);
  await user.type(loginPasscodeInput, formData.loginPasscode);
  await user.type(email, formData.email);
  await user.type(middleName, formData.middleName);
  await user.type(lastName, formData.lastName);
  await user.type(firstName, formData.firstName);
  await user.click(check);

  const Inputs = [
    { input: phoneInput, data: formData.phone },
    { input: loginPasscodeInput, data: formData.loginPasscode },
    { input: email, data: formData.email },
    { input: middleName, data: formData.middleName },
    { input: lastName, data: formData.lastName },
    { input: firstName, data: formData.firstName },
  ];

  for (let unit of Inputs) {
    expect(unit.input).toHaveValue(unit.data);
  }

  expect(check).toBeChecked;
};
const handleAssertLoadingAfterConfirmClick = async () => {
  const ConfirmButton = screen.getByRole("button", { name: /confirm/i });

  const getLoadingElement = () => screen.getByTestId("loading");
  expect(getLoadingElement()).toBeInTheDocument();

  expect(ConfirmButton).toBeDisabled();
  await waitForElementToBeRemoved(() => getLoadingElement());

  expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  expect(ConfirmButton).not.toBeDisabled();
};

test("Signup form works correctly onLoading", async () => {
  const user = userEvent.setup();
  renderComponent();

  await handleAssertTypeInForm(user, {
    phone: "1234567890",
    loginPasscode: "123456",
    email: "example@gmail.com",
    middleName: "middleName",
    lastName: "lastName",
    firstName: "firstName",
  });
  expect(screen.queryByTestId("loading")).not.toBeInTheDocument();

  const confirmButton = screen.getByRole("button", { name: /confirm/i });
  expect(confirmButton).not.toBeDisabled();

  await user.click(confirmButton);

  // await handleAssertLoadingAfterConfirmClick();
});

test("Confirm form works correctly onSuccess", async () => {
  const user = userEvent.setup();
  renderComponent();

  await handleAssertTypeInForm(user, {
    phone: "1234567890",
    loginPasscode: "123456",
    email: "example@gmail.com",
    middleName: "middleName",
    lastName: "lastName",
    firstName: "firstName",
  });

  const confirmButton = screen.getByRole("button", { name: /confirm/i });
  await user.click(confirmButton);

  waitFor(() => expect(navigate).toHaveBeenCalled());

  // await handleAssertLoadingAfterConfirmClick();
});

test("Signing form works correctly onError", async () => {
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

  handleCreateErrorConfig({
    method: "post",
    url: `${BASE_URL}/auth/signin`,
    statusCode: 400,
  });
  const user = userEvent.setup();
  renderComponent();

  await handleAssertTypeInForm(user, {
    phone: "1234567890",
    loginPasscode: "123456",
    email: "example@gmail.com",
    middleName: "middleName",
    lastName: "lastName",
    firstName: "firstName",
  });

  expect(consoleErrorSpy).not.toHaveBeenCalled();

  const confirm = screen.getByRole("button", { name: /confirm/i });
  await user.click(confirm);

  // await handleAssertLoadingAfterConfirmClick();

  expect(consoleErrorSpy).toHaveBeenCalled();
  const error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();
  expect(error).toHaveTextContent("");

  consoleErrorSpy.mockRestore();
});
