import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ResetLoginPasscode from ".";

import createServer from "@utils/test/createServer";
import { consoleErrorSpy } from "@utils/test/mocks/consoleSpy";
import { navigate } from "@utils/test/mocks/navigate";
import { handleAssertLoadingState } from "@utils/test/assertUtils";

import { BASE_URL, ENDPOINTS } from "@constants/services";
import { CLIENT_ROUTES } from "@constants/routes";

import TestProviders from "@components/TestProviders";

const { handleCreateErrorConfig } = createServer([
  {
    method: "post",
    url: `${BASE_URL}${ENDPOINTS.resetLoginPasscode}`,
  },
  `${BASE_URL}${ENDPOINTS.currentUser}`,
]);

test("Resets login passcode and redirects to sign-in page", async () => {
  const user = userEvent.setup();
  render(<ResetLoginPasscode />, {
    wrapper: TestProviders,
  });

  const codeInput = screen.getByPlaceholderText("Enter code");
  const newPasscodeInput = screen.getByPlaceholderText("Enter new passcode");
  const submitButton = screen.getByRole("button", { name: /reset login passcode/i });

  expect(navigate).not.toHaveBeenCalled();

  await user.type(codeInput, "123456");
  await user.type(newPasscodeInput, "123456");
  await user.click(submitButton);

  await handleAssertLoadingState(submitButton);

  expect(navigate).toHaveBeenCalled();
  expect(navigate).toHaveBeenCalledWith(CLIENT_ROUTES.authSignin);
});

test("Displays errors works correctly when the network request errors", async () => {
  handleCreateErrorConfig({
    method: "post",
    url: `${BASE_URL}${ENDPOINTS.resetLoginPasscode}`,
    statusCode: 400,
  });
  const user = userEvent.setup();
  render(<ResetLoginPasscode />, {
    wrapper: TestProviders,
  });

  const codeInput = screen.getByPlaceholderText("Enter code");
  const newPasscodeInput = screen.getByPlaceholderText("Enter new passcode");
  const submitButton = screen.getByRole("button", { name: /reset login passcode/i });

  expect(JSON.stringify(consoleErrorSpy.mock.calls)).not.toContain("Request failed with status code 400");

  await user.type(codeInput, "123456");
  await user.type(newPasscodeInput, "123456");

  await user.click(submitButton);

  await handleAssertLoadingState(submitButton);

  expect(JSON.stringify(consoleErrorSpy.mock.calls)).toContain("Request failed with status code 400");

  const error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();
  expect(error).toHaveTextContent("");
});
