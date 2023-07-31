import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ForgetPassword from ".";
import createServer from "../../../utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "../../../constants/services";
import { handleAssertLoadingAfterSubmitClick } from "../../../utils/test/assertUtils";
import { navigate } from "../../../utils/test/mocks/navigate";
import { CLIENT_ROUTES } from "../../../constants";
import { consoleErrorSpy } from "../../../utils/test/mocks/consoleSpy";

import TestProviders from "../../../components/TestProviders";

const { handleCreateErrorConfig } = createServer([
  {
    method: "post",
    url: `${BASE_URL}${ENDPOINTS.forgetPasscode}`,
  },
  `${BASE_URL}${ENDPOINTS.currentUser}`,
]);

test("asserts that user is navigated to sign in on success ", async () => {
  userEvent.setup();
  render(<ForgetPassword />, {
    wrapper: TestProviders,
  });

  const phoneInput = screen.getByLabelText(/phone number/i);
  const email = screen.getByLabelText(/email/i);
  const resendOtpButton = screen.getByRole("button", {
    name: /send/i,
  });

  await userEvent.type(phoneInput, "1234567890");
  await userEvent.type(email, "test1@gmail.com");
  await userEvent.click(resendOtpButton);

  expect(navigate).not.toHaveBeenCalled();
  await handleAssertLoadingAfterSubmitClick(resendOtpButton);
  expect(navigate).toHaveBeenCalled();
  expect(navigate).toHaveBeenCalledWith(CLIENT_ROUTES.authSignin);
});

test("Displays errors works correctly when the network request errors", async () => {
  handleCreateErrorConfig({
    method: "post",
    url: `${BASE_URL}${ENDPOINTS.forgetPasscode}`,
    statusCode: 400,
  });
  const user = userEvent.setup();
  render(<ForgetPassword />, {
    wrapper: TestProviders,
  });
  const phoneInput = screen.getByLabelText(/phone number/i);
  const email = screen.getByLabelText(/email/i);
  const resendOtpButton = screen.getByRole("button", {
    name: /send/i,
  });

  expect(JSON.stringify(consoleErrorSpy.mock.calls)).not.toContain("Request failed with status code 400");

  await user.type(phoneInput, "1234567890");
  await user.type(email, "test@example.com");
  await user.click(resendOtpButton);

  await handleAssertLoadingAfterSubmitClick(resendOtpButton);

  expect(JSON.stringify(consoleErrorSpy.mock.calls)).toContain("Request failed with status code 400");
  const error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();
  expect(error).toHaveTextContent("");
});
