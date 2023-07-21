import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import Signin from "./";
import createServer from "../../utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "../../constants/services";
import { TUser } from "../../services/users/types";

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
        <Signin />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const handleCreateSignInConfigSuccess = (response: { data?: Partial<TUser>; token: string }) => {
  const { handleCreateErrorConfig } = createServer([
    {
      method: "post",
      url: `${BASE_URL}${ENDPOINTS.signIn}`,
      res() {
        return response;
      },
    },
    {
      url: `${BASE_URL}${ENDPOINTS.currentUser}`,
      res() {
        return {};
      },
    },
  ]);

  return handleCreateErrorConfig;
};

const handleAssertTypeInForm = async (
  user: ReturnType<typeof userEvent.setup>,
  formData: { phone: string; loginPasscode: string }
) => {
  const phoneInput = screen.getByPlaceholderText(/phone number/i);
  const loginPasscodeInput = screen.getByPlaceholderText(/enter 6 digits login passcode/i);

  await user.type(phoneInput, formData.phone);
  await user.type(loginPasscodeInput, formData.loginPasscode);

  expect(phoneInput).toHaveValue(formData.phone);
  expect(loginPasscodeInput).toHaveValue(formData.loginPasscode);
};

const handleAssertLoadingAfterSubmitClick = async () => {
  const signInButton = screen.getByRole("button", { name: /sign in/i });

  const getLoadingElement = () => screen.getByTestId("loading");
  expect(getLoadingElement()).toBeInTheDocument();

  expect(signInButton).toBeDisabled();
  await waitForElementToBeRemoved(() => getLoadingElement());

  expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  expect(signInButton).not.toBeDisabled();
};

test("Render content of Signin page correctly", () => {
  renderComponent();

  const pageTitle = screen.getByRole("heading", { name: /sign in/i });
  const subTitle = screen.getByRole("heading", { name: /welcome back/i });

  const phoneInput = screen.getByPlaceholderText(/phone number/i);
  const passwordInput = screen.getByPlaceholderText(/enter 6 digits login passcode/i);

  const rememberLoginPasscode = screen.getByRole("checkbox", { name: /remember login passcode/i });
  const forgotLoginPasscode = screen.getByRole("link", { name: /forgot login passcode/i });

  const signInButton = screen.getByRole("button", { name: /sign in/i });

  const goToSignup = screen.getByRole("link", { name: /don\'t have an account\? sign up/i });
  expect(goToSignup).toHaveAttribute("href", "/auth/signup");

  expect(pageTitle).toBeInTheDocument();
  expect(subTitle).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(rememberLoginPasscode).toBeInTheDocument();
  expect(forgotLoginPasscode).toBeInTheDocument();
  expect(signInButton).toBeInTheDocument();
  expect(goToSignup).toBeInTheDocument();
});

describe("When signin request failed ", () => {
  const handleCreateErrorConfig = handleCreateSignInConfigSuccess({
    token: "1234567890",
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

    await handleAssertTypeInForm(user, { phone: "1234567890", loginPasscode: "123456" });

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    await user.click(signInButton);

    await handleAssertLoadingAfterSubmitClick();

    expect(consoleErrorSpy).toHaveBeenCalled();
    const error = screen.getByTestId("error");
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent("");

    consoleErrorSpy.mockRestore();
  });
});

describe("When signin request is successful and email has been verified", () => {
  handleCreateSignInConfigSuccess({
    token: "1234567890",
    data: {
      email_is_verified: true,
    },
  });

  test("Signing form works correctly onSuccess", async () => {
    const user = userEvent.setup();
    renderComponent();

    await handleAssertTypeInForm(user, { phone: "1234567890", loginPasscode: "123456" });

    expect(window.location.reload).not.toHaveBeenCalled();

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    await user.click(signInButton);

    await handleAssertLoadingAfterSubmitClick();

    expect(window.location.reload).toHaveBeenCalled();
  });
});

describe("When signin request is successful and email has NOT been verified", () => {
  handleCreateSignInConfigSuccess({
    token: "1234567890",
    data: {
      email_is_verified: false,
    },
  });

  test("Signing form works correctly onSuccess", async () => {
    const user = userEvent.setup();
    renderComponent();

    await handleAssertTypeInForm(user, { phone: "1234567890", loginPasscode: "123456" });

    expect(window.location.reload).not.toHaveBeenCalled();

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    await user.click(signInButton);

    await handleAssertLoadingAfterSubmitClick();

    expect(window.location.reload).toHaveBeenCalled();
  });
});
