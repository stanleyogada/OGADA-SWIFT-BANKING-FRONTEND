import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import VerifyEmail from ".";
import createServer from "../../../utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "../../../constants/services";
import { handleAssertLoadingAfterSubmitClick } from "../../../utils/test/assertUtils";
import { navigate } from "../../../utils/test/mocks/navigate";
import { CLIENT_ROUTES, LOCAL_STORAGE_KEYS } from "../../../constants";
import { consoleErrorSpy } from "../../../utils/test/mocks/consoleSpy";
import { localStorageGetItem } from "../../../utils/test/mocks/localStorage";
import { RESEND_BUTTON_ENABLED_TEXT, RESEND_SECONDS } from "./hooks/useVerifyEmail";

import type { TResendDetails } from "./type";
import TestProviders from "../../../components/TestProviders";

const OTP = "123456";

const { handleCreateErrorConfig } = createServer([
  {
    method: "post",
    url: `${BASE_URL}${ENDPOINTS.verifyEmail}/${OTP}`,
  },
  `${BASE_URL}${ENDPOINTS.currentUser}`,
]);

test("Verifies email and redirects to sign-in page", async () => {
  const user = userEvent.setup();
  render(<VerifyEmail />, {
    wrapper: TestProviders,
  });

  const codeInput = screen.getByPlaceholderText("Enter code");
  const submitButton = screen.getByRole("button", { name: /verify/i });

  expect(navigate).not.toHaveBeenCalled();

  await user.type(codeInput, OTP);
  await user.click(submitButton);

  await handleAssertLoadingAfterSubmitClick(submitButton);

  expect(navigate).toHaveBeenCalled();
  expect(navigate).toHaveBeenCalledWith(CLIENT_ROUTES.authSignin);
});

test("Displays errors works correctly when the network request errors", async () => {
  handleCreateErrorConfig({
    method: "post",
    url: `${BASE_URL}${ENDPOINTS.verifyEmail}/${OTP}`,
    statusCode: 400,
  });
  const user = userEvent.setup();
  render(<VerifyEmail />, {
    wrapper: TestProviders,
  });

  const codeInput = screen.getByPlaceholderText("Enter code");
  const submitButton = screen.getByRole("button", { name: /verify/i });

  expect(JSON.stringify(consoleErrorSpy.mock.calls)).not.toContain("Request failed with status code 400");

  await user.type(codeInput, OTP);
  await user.click(submitButton);

  await handleAssertLoadingAfterSubmitClick(submitButton);

  expect(JSON.stringify(consoleErrorSpy.mock.calls)).toContain("Request failed with status code 400");

  const error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();
  expect(error).toHaveTextContent("");
});

describe("Resend button works correctly", () => {
  describe("Get data from localStorage", () => {
    const now = new Date().getTime();
    const getLocalStorageGetItemValue = (savedAtSeconds: number) =>
      JSON.stringify({
        savedAtTime: now - savedAtSeconds * 1000, // 20 seconds ago
      } as unknown as Omit<TResendDetails, "timeSecondsLeft">);

    test("When there's data from localStorage and it's 20 seconds ago", async () => {
      let savedAtSeconds = 20; // 20 seconds ago
      localStorageGetItem.mockReturnValueOnce(getLocalStorageGetItemValue(savedAtSeconds));
      render(<VerifyEmail />, {
        wrapper: TestProviders,
      });

      const resendButton = screen.getByRole("button", { name: /didn't receive the code\?/i });
      expect(resendButton).toBeDisabled();
      expect(resendButton.textContent).toContain(`${RESEND_SECONDS - savedAtSeconds}s`);
      expect(resendButton.textContent).not.toContain(RESEND_BUTTON_ENABLED_TEXT);

      expect(localStorageGetItem).toHaveBeenCalled();
      expect(localStorageGetItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.sendEmailCodeSuccess);
    });

    test("When there's data from localStorage and it's now", async () => {
      const savedAtSeconds = 0; // now
      localStorageGetItem.mockReturnValueOnce(getLocalStorageGetItemValue(savedAtSeconds));
      render(<VerifyEmail />, {
        wrapper: TestProviders,
      });

      const resendButtonNew = screen.getByRole("button", { name: /didn't receive the code\?/i });
      expect(resendButtonNew.textContent).toContain(`${RESEND_SECONDS}s`);

      // Ensure its counting down
      expect(resendButtonNew.textContent).toContain(`${RESEND_SECONDS}s`);
    });

    test("When there's NO data from localStorage", async () => {
      localStorageGetItem.mockReturnValueOnce(null);
      render(<VerifyEmail />, {
        wrapper: TestProviders,
      });
      const user = userEvent.setup();

      const enabledResendButton = screen.getByRole("button", { name: /didn't receive the code\?/i });
      expect(enabledResendButton).toBeEnabled();
      expect(enabledResendButton.textContent).toContain(RESEND_BUTTON_ENABLED_TEXT);

      expect(navigate).not.toHaveBeenCalled();

      await user.click(enabledResendButton);

      expect(navigate).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith(CLIENT_ROUTES.authResendEmail);
    });
  });

  describe("Countdown", () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    test("Resend button countdown and expires correctly", async () => {
      const now = new Date().getTime();
      const getLocalStorageGetItemValue = (savedAtSeconds: number) =>
        JSON.stringify({
          email: "testResend@gmail.com",
          savedAtTime: now - savedAtSeconds * 1000,
        } as unknown as Omit<TResendDetails, "timeSecondsLeft">);

      let savedAtSeconds = RESEND_SECONDS - 4; // only 4 before the resend button is enabled
      localStorageGetItem.mockReturnValueOnce(getLocalStorageGetItemValue(savedAtSeconds));
      render(<VerifyEmail />, {
        wrapper: TestProviders,
      });

      const resendButton = screen.getByRole("button", { name: /didn't receive the code\?/i });

      expect(resendButton.textContent).toContain(`${RESEND_SECONDS - savedAtSeconds}s`); // 4 seconds left

      jest.advanceTimersByTime(1000); // mocks 1 second passing
      let button = await screen.findByText(new RegExp(`${RESEND_SECONDS - savedAtSeconds - 1}s`, "i")); // 3 seconds left
      expect(button).toBeDisabled();

      jest.advanceTimersByTime(1000); // mocks 1 second passing
      button = await screen.findByText(new RegExp(`${RESEND_SECONDS - savedAtSeconds - 2}s`, "i")); // 2 seconds left
      expect(button).toBeDisabled();

      jest.advanceTimersByTime(2000); // mocks 2 seconds passing
      button = await screen.findByText(new RegExp(RESEND_BUTTON_ENABLED_TEXT, "i")); // 0 seconds left
      expect(button).toBeEnabled();
    });
  });
});
