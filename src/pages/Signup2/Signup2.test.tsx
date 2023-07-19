import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import Signup2 from ".";
import createServer from "../../utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "../../constants/services";
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
    url: `${BASE_URL}${ENDPOINTS.signUp}`,
    res() {
      return {
        status: "success",
        data: {
          id: 4,
          created_at: "2023-06-21T17:05:11.518Z",
          updated_at: "2023-06-21T17:05:11.518Z",
          first_name: "Test2",
          last_name: "Last2",
          middle_name: "Hire",
          nickname: null,
          email: "test2@gmail.com",
          phone: "1234567890",
        },
      };
    },
  },
  {
    method: "post",
    url: `${BASE_URL}${ENDPOINTS.sendEmail}`,
    res() {
      return {
        status: "success",
        data: {
          status: "success",
          message: "One time password sent to your email address!",
        },
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

  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const middleNameInput = screen.getByLabelText(/middle name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const phoneInput = screen.getByLabelText(/phone number/i);
  const phoneInputInfo = screen.getByText(/This would be your account number/i); // TODO: uncomment this line after adding this text to the page
  const passwordInput = screen.getByLabelText(/enter 6 digits login passcode/i);

  const clickToAgree = screen.getByRole("checkbox", { name: /click .confirm. to accept/i });
  const termsAndConditions = screen.getByRole("link", { name: /terms and conditions./i });

  const confirmButton = screen.getByRole("button", { name: /confirm/i });

  const goToSignin = screen.getByRole("link", { name: /already have an account\? sign in/i });
  expect(goToSignin).toHaveAttribute("href", "/auth/signin");

  expect(goToSignin).toHaveAttribute("href", "/auth/signin");

  expect(pageTitle).toBeInTheDocument();
  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(middleNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(phoneInputInfo).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();

  expect(clickToAgree).toBeInTheDocument();
  expect(termsAndConditions).toBeInTheDocument();

  expect(confirmButton).toBeInTheDocument();

  expect(goToSignin).toBeInTheDocument();
});

const handleAssertTypeInForm = async (
  user: ReturnType<typeof userEvent.setup>,
  formData: Omit<TSignUpFormValues, "acceptTerms">
) => {
  const inputList = [
    {
      input: screen.getByLabelText(/first name/i),
      value: formData.firstName,
    },
    {
      input: screen.getByLabelText(/last name/i),
      value: formData.lastName,
    },
    {
      input: screen.getByLabelText(/middle name/i),
      value: formData.middleName,
    },
    {
      input: screen.getByLabelText(/email/i),
      value: formData.email,
    },
    {
      input: screen.getByLabelText(/phone number/i),
      value: formData.phoneNumber,
    },
    {
      input: screen.getByLabelText(/enter 6 digits login passcode/i),
      value: formData.loginPasscode,
    },
  ];

  for (const { input, value } of inputList) {
    await user.type(input, value);
    expect(input).toHaveValue(value);
  }
};

const handleAssertLoadingAfterSubmitClick = async () => {
  const signUpButton = screen.getByRole("button", { name: /confirm/i });

  const getLoadingElement = () => screen.getByTestId("loading");
  expect(getLoadingElement()).toBeInTheDocument();

  expect(signUpButton).toBeDisabled();
  await waitForElementToBeRemoved(() => getLoadingElement());

  expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  expect(signUpButton).not.toBeDisabled();
};

test("Sign up form works correctly onLoading", async () => {
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

  const signUpButton = screen.getByRole("button", { name: /confirm/i });
  expect(signUpButton).not.toBeDisabled();

  await user.click(signUpButton);

  await handleAssertLoadingAfterSubmitClick();
});

test("Sign up form works correctly onSuccess", async () => {
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

  const signUpButton = screen.getByRole("button", { name: /confirm/i });
  await user.click(signUpButton);

  await handleAssertLoadingAfterSubmitClick();

  expect(window.location.reload).toHaveBeenCalled();
});

describe("Errors correctly", () => {
  const handleAssertError = async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const user = userEvent.setup();

    await handleAssertTypeInForm(user, {
      phoneNumber: "1234567890",
      loginPasscode: "123456",
      email: "example@gmail.com",
      middleName: "middleName",
      lastName: "lastName",
      firstName: "firstName",
    });

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    const signUpButton = screen.getByRole("button", { name: /confirm/i });
    await user.click(signUpButton);

    await handleAssertLoadingAfterSubmitClick();

    expect(consoleErrorSpy).toHaveBeenCalled();
    const error = screen.getByTestId("error");
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent("");

    consoleErrorSpy.mockRestore();
  };

  test("On /signup network error", async () => {
    handleCreateErrorConfig({
      method: "post",
      url: `${BASE_URL}${ENDPOINTS.signUp}`,
      statusCode: 400,
    });
    renderComponent();

    await handleAssertError();
  });

  test("On /send-email-verification network error", async () => {
    handleCreateErrorConfig({
      method: "post",
      url: `${BASE_URL}${ENDPOINTS.sendEmail}`,
      statusCode: 400,
    });
    renderComponent();

    await handleAssertError();
  });
});
