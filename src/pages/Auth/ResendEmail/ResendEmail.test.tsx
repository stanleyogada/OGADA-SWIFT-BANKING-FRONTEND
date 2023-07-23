import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import createServer from "../../../utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "../../../constants/services";
import { navigate } from "../../../utils/test/mocks/navigate";
import { CLIENT_ROUTES } from "../../../constants";
import ResendEmail from ".";
import { handleAssertLoadingAfterSubmitClick } from "../../../utils/test/assertUtils";
import { consoleErrorSpy } from "../../../utils/test/mocks/consoleSpy";

const renderComponent = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  render(
    // @ts-ignore
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ResendEmail />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const { handleCreateErrorConfig } = createServer([
  {
    method: "post",
    url: `${BASE_URL}${ENDPOINTS.sendEmail}`,
  },
  `${BASE_URL}${ENDPOINTS.currentUser}`,
]);

test("Sends email and redirects to verify email code page", async () => {
  const user = userEvent.setup();
  renderComponent();

  const emailInput = screen.getByPlaceholderText(/email/i);
  const submitButton = screen.getByRole("button", { name: /send/i });

  expect(navigate).not.toHaveBeenCalled();

  await user.type(emailInput, "test@gmail.com");
  await user.click(submitButton);

  await handleAssertLoadingAfterSubmitClick(submitButton);

  expect(navigate).toHaveBeenCalled();
  expect(navigate).toHaveBeenCalledWith(CLIENT_ROUTES.authVerifyEmail);
});

test("Displays errors works correctly when the network request errors", async () => {
  handleCreateErrorConfig({
    url: `${BASE_URL}${ENDPOINTS.sendEmail}`,
    method: "post",
    statusCode: 402,
  });

  const user = userEvent.setup();
  renderComponent();

  const emailInput = screen.getByPlaceholderText(/email/i);
  const submitButton = screen.getByRole("button", { name: /send/i });

  expect(JSON.stringify(consoleErrorSpy.mock.calls)).not.toContain("Request failed with status code 402");

  await user.type(emailInput, "test@gmail.com");
  await user.click(submitButton);

  await handleAssertLoadingAfterSubmitClick(submitButton);

  expect(navigate).not.toHaveBeenCalled();
  expect(JSON.stringify(consoleErrorSpy.mock.calls)).toContain("Request failed with status code 402");
});
