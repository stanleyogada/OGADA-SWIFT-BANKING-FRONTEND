import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Signin from ".";
import createServer from "../../../utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "../../../constants/services";
import { TUser } from "../../../services/users/types";
import { CLIENT_ROUTES } from "../../../constants";
import { consoleErrorSpy } from "../../../utils/test/mocks/consoleSpy";
import { handleAssertLoadingAfterSubmitClick } from "../../../utils/test/assertUtils";
import { navigate } from "../../../utils/test/mocks/navigate";
import TestProviders from "../../../components/TestProviders";

const handleCreateSignInConfigSuccess = (response: { data?: Partial<TUser>; token: string }) => {
  const { handleCreateErrorConfig } = createServer([
    {
      method: "post",
      url: `${BASE_URL}${ENDPOINTS.signIn}`,
      res() {
        return response;
      },
    },
    `${BASE_URL}${ENDPOINTS.currentUser}`,
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

describe("When signin request failed ", () => {
  const handleCreateErrorConfig = handleCreateSignInConfigSuccess({
    token: "1234567890",
  });

  test("Displays errors works correctly when the network request errors", async () => {
    handleCreateErrorConfig({
      method: "post",
      url: `${BASE_URL}/auth/signin`,
      statusCode: 400,
    });
    const user = userEvent.setup();
    render(<Signin />, {
      wrapper: TestProviders,
    });

    await handleAssertTypeInForm(user, { phone: "1234567890", loginPasscode: "123456" });
    expect(JSON.stringify(consoleErrorSpy.mock.calls)).not.toContain("Request failed with status code 400");

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    await user.click(signInButton);

    await handleAssertLoadingAfterSubmitClick(signInButton);

    expect(JSON.stringify(consoleErrorSpy.mock.calls)).toContain("Request failed with status code 400");

    const error = screen.getByTestId("error");
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent("");
  });
});

describe("Signin form works correctly onSuccess", () => {
  describe("When the user email has been verified", () => {
    handleCreateSignInConfigSuccess({
      token: "1234567890",
      data: {
        email_is_verified: true,
      },
    });

    test("Forces a reload at the end of the operation", async () => {
      const user = userEvent.setup();
      render(<Signin />, {
        wrapper: TestProviders,
      });

      await handleAssertTypeInForm(user, { phone: "1234567890", loginPasscode: "123456" });
      expect(window.location.reload).not.toHaveBeenCalled();

      const signInButton = screen.getByRole("button", { name: /sign in/i });
      await user.click(signInButton);

      await handleAssertLoadingAfterSubmitClick(signInButton);

      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  describe("When the user email has not been verified", () => {
    handleCreateSignInConfigSuccess({
      token: "1234567890",
      data: {
        email_is_verified: false,
      },
    });

    test("Forces a navigate at the end of the operation", async () => {
      const user = userEvent.setup();
      render(<Signin />, {
        wrapper: TestProviders,
      });

      await handleAssertTypeInForm(user, { phone: "1234567890", loginPasscode: "123456" });
      expect(navigate).not.toHaveBeenCalled();

      const signInButton = screen.getByRole("button", { name: /sign in/i });
      await user.click(signInButton);

      await handleAssertLoadingAfterSubmitClick(signInButton);

      expect(window.location.reload).not.toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith(CLIENT_ROUTES.authVerifyEmail);
    });
  });
});
