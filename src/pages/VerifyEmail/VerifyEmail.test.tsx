import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import createServer from "../../utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "../../constants/services";
import VerifyEmail from ".";
import { handleAssertLoadingAfterSubmitClick } from "../../utils/test/assertUtils";
import { navigate } from "../../utils/test/mocks/navigate";
import { CLIENT_ROUTES } from "../../constants";
import { consoleErrorSpy } from "../../utils/test/mocks/consoleSpy";

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
  {
    url: `${BASE_URL}${ENDPOINTS.currentUser}`,
  },
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
