import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TestProviders from "@components/TestProviders";
import { navigate } from "@utils/test/mocks/navigate";
import { CLIENT_ROUTES } from "@constants/routes";
import { consoleInfoSpy } from "@utils/test/mocks/consoleSpy";
import { TEST_LOG_PREFIX } from "@constants/index";

import SendMoneyModal from ".";

let user: ReturnType<typeof userEvent.setup>;
beforeEach(() => (user = userEvent.setup()));

test("Renders as expected for success", async () => {
  render(<SendMoneyModal />, {
    wrapper: TestProviders,
  });

  expect(screen.getByText(/transfer was successful/i)).toBeInTheDocument();

  const sendMoneyAgainButton = screen.getByRole("button", { name: /send money again/i });
  const continueToHomeButton = screen.getByRole("button", { name: /continue to home/i });

  await user.click(sendMoneyAgainButton);
  expect(window.location.reload).toHaveBeenCalled();

  await user.click(continueToHomeButton);
  expect(navigate).toHaveBeenCalledWith(CLIENT_ROUTES.home);
});

test("Renders as expected for failure", async () => {
  render(<SendMoneyModal hasError />, {
    wrapper: TestProviders,
  });

  expect(screen.getByText(/transfer failed!/i)).toBeInTheDocument();

  const tryAgainButton = screen.getByRole("button", { name: /try again/i });
  const continueToHomeButton = screen.getByRole("button", { name: /continue to home/i });

  await user.click(tryAgainButton);
  expect(consoleInfoSpy).toHaveBeenCalledWith(TEST_LOG_PREFIX, "Try again");

  await user.click(continueToHomeButton);
  expect(navigate).toHaveBeenCalledWith(CLIENT_ROUTES.home);
});
