import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import createServer from "../../utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "../../constants/services";
import VerifyEmail from ".";
import { handleAssertLoadingAfterSubmitClick } from "../../utils/test/assertUtils";

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

  await user.type(codeInput, OTP);
  await user.click(submitButton);

  await handleAssertLoadingAfterSubmitClick(submitButton);
});
