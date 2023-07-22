import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import createServer from "../../utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "../../constants/services";
import VerifyEmail from ".";
import { handleAssertLoadingAfterSubmitClick } from "../../utils/test/assertUtils";
import { navigate } from "../../utils/test/mocks/navigate";
import { CLIENT_ROUTES, LOCAL_STORAGE_KEYS } from "../../constants";
import { consoleErrorSpy } from "../../utils/test/mocks/consoleSpy";
import { localStorageGetItem } from "../../utils/test/mocks/localStorage";

const renderComponent = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  render(
    // @ts-ignore
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <VerifyEmail />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const OTP = "123456";

const { handleCreateErrorConfig } = createServer([
  {
    method: "post",
    url: `${BASE_URL}${ENDPOINTS.verifyEmail}/${OTP}`,
  },
  `${BASE_URL}${ENDPOINTS.currentUser}`,
]);

test("Verifies email and redirects to login", async () => {
  const user = userEvent.setup();
  renderComponent();

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
  renderComponent();

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

test("Displays resend button and works correctly", async () => {
  const now = new Date().getTime();
  const resendInSeconds = 30;
  const savedAtSeconds = 20;
  const localStorageGetItemValue = JSON.stringify({
    email: "testResend@gmail.com",
    // 20 seconds ago
    savedAtTime: now - savedAtSeconds * 1000,
  });

  localStorageGetItem.mockReturnValueOnce(localStorageGetItemValue);
  renderComponent();

  const resendButton = screen.getByRole("button", { name: /didn't receive the code\?/i });
  expect(resendButton).toBeDisabled();
  expect(resendButton.textContent).toContain(`${resendInSeconds - savedAtSeconds}s`);

  expect(localStorageGetItem).toHaveBeenCalled();
  expect(localStorageGetItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.signupSuccess);

  cleanup();
  localStorageGetItem.mockClear();

  localStorageGetItem.mockReturnValueOnce(null);
  renderComponent();
  const user = userEvent.setup();

  const resendButtonNew = screen.getByRole("button", { name: /didn't receive the code\?/i });
  expect(resendButtonNew).toBeEnabled();
  expect(resendButtonNew.textContent).toContain("You can resend now!");

  expect(navigate).not.toHaveBeenCalled();

  await user.click(resendButtonNew);

  expect(navigate).toHaveBeenCalled();
  expect(navigate).toHaveBeenCalledWith(CLIENT_ROUTES.authResendEmail);
});
