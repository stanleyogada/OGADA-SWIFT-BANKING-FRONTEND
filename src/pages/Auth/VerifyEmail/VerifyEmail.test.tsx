import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import VerifyEmail from ".";

import createServer from "@utils/test/createServer";
import { consoleErrorSpy } from "@utils/test/mocks/consoleSpy";
import { navigate } from "@utils/test/mocks/navigate";
import { handleAssertLoadingState } from "@utils/test/assertUtils";

import { BASE_URL, ENDPOINTS } from "@constants/services";
import { CLIENT_ROUTES } from "@constants/routes";

import TestProviders from "@components/TestProviders";

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

  await handleAssertLoadingState(submitButton);

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

  await handleAssertLoadingState(submitButton);

  expect(JSON.stringify(consoleErrorSpy.mock.calls)).toContain("Request failed with status code 400");

  const error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();
  expect(error).toHaveTextContent("");
});
