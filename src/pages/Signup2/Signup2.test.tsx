import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import Signup2 from ".";
import createServer from "../../utils/test/createServer";
import { BASE_URL } from "../../constants/services";
import { TSignUpFormValues } from "./type";

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
        <Signup2 />
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

// test("Render content of Signup page correctly", () => {
//   renderComponent();

//   const pageTitle = screen.getByRole("heading", { name: /Create a new account/i });

//   const firstNameInput = screen.getByPlaceholderText(/first name/i);
//   const lastNameInput = screen.getByPlaceholderText(/last name/i);
//   const middleNameInput = screen.getByPlaceholderText(/middle name/i);
//   const emailInput = screen.getByPlaceholderText(/email/i);
//   const phoneInput = screen.getByPlaceholderText(/phone number/i);
//   const phoneInputInfo = screen.getByText(/This would be your account number/i); // TODO: uncomment this line after adding this text to the page
//   const passwordInput = screen.getByPlaceholderText(/enter 6 digits login passcode/i);

//   const clickToAgree = screen.getByRole("checkbox", { name: /click .confirm. to accept/i });
//   const termsAndConditions = screen.getByRole("link", { name: /terms and conditions./i });

//   const confirmButton = screen.getByRole("button", { name: /confirm/i });

//   const goToSignin = screen.getByRole("link", { name: /already have an account\? confirm/i });
//   expect(goToSignin).toHaveAttribute("href", "/auth/signin");

//   expect(goToSignin).toHaveAttribute("href", "/auth/signin");

//   expect(pageTitle).toBeInTheDocument();
//   expect(phoneInput).toBeInTheDocument();
//   expect(passwordInput).toBeInTheDocument();
// });

const handleAssertTypeInForm = async (
  user: ReturnType<typeof userEvent.setup>,
  formData: Omit<TSignUpFormValues, "acceptTerms">
) => {
  const inputList = [
    {
      input: screen.getByPlaceholderText(/first name/i),
      value: formData.firstName,
    },
    {
      input: screen.getByPlaceholderText(/last name/i),
      value: formData.lastName,
    },
    {
      input: screen.getByPlaceholderText(/middle name/i),
      value: formData.middleName,
    },
    {
      input: screen.getByPlaceholderText(/email/i),
      value: formData.email,
    },
    {
      input: screen.getByPlaceholderText(/phone number/i),
      value: formData.phoneNumber,
    },
    {
      input: screen.getByPlaceholderText(/enter 6 digits login passcode/i),
      value: formData.loginPasscode,
    },
  ];

  for (const { input, value } of inputList) {
    await user.type(input, value);
    expect(input).toHaveValue(value);
  }
};

const handleAssertLoadingAfterSubmitClick = async () => {
  const signInButton = screen.getByRole("button", { name: /confirm/i });

  const getLoadingElement = () => screen.getByTestId("loading");
  expect(getLoadingElement()).toBeInTheDocument();

  expect(signInButton).toBeDisabled();
  await waitForElementToBeRemoved(() => getLoadingElement());

  expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  expect(signInButton).not.toBeDisabled();
};

test("Signing form works correctly onLoading", async () => {
  const user = userEvent.setup();
  renderComponent();

  await handleAssertTypeInForm(user, {
    phoneNumber: "1234567890",
    loginPasscode: "123456",
    email: "example@gmail.com",
    middleName: "middleName",
    lastName: "lastName",
    firstName: "firstName",
  });

  expect(screen.queryByTestId("loading")).not.toBeInTheDocument();

  const signInButton = screen.getByRole("button", { name: /confirm/i });
  expect(signInButton).not.toBeDisabled();

  await user.click(signInButton);

  await handleAssertLoadingAfterSubmitClick();
});

test("Signing form works correctly onSuccess", async () => {
  const user = userEvent.setup();
  renderComponent();

  await handleAssertTypeInForm(user, {
    phoneNumber: "1234567890",
    loginPasscode: "123456",
    email: "example@gmail.com",
    middleName: "middleName",
    lastName: "lastName",
    firstName: "firstName",
  });

  expect(window.location.reload).not.toHaveBeenCalled();

  const signInButton = screen.getByRole("button", { name: /confirm/i });
  await user.click(signInButton);

  await handleAssertLoadingAfterSubmitClick();

  expect(window.location.reload).toHaveBeenCalled();
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
    phoneNumber: "1234567890",
    loginPasscode: "123456",
    email: "example@gmail.com",
    middleName: "middleName",
    lastName: "lastName",
    firstName: "firstName",
  });

  expect(consoleErrorSpy).not.toHaveBeenCalled();

  const signInButton = screen.getByRole("button", { name: /confirm/i });
  await user.click(signInButton);

  await handleAssertLoadingAfterSubmitClick();

  expect(consoleErrorSpy).toHaveBeenCalled();
  const error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();
  expect(error).toHaveTextContent("");

  consoleErrorSpy.mockRestore();
});
