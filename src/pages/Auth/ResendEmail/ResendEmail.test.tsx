import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ResendEmail from ".";

import createServer from "@utils/test/createServer";
import { handleAssertLoadingAfterSubmitClick } from "@utils/test/assertUtils";
import { localStorageGetItem, localStorageSetItem } from "@utils/test/mocks/localStorage";

import TestProviders from "@components/TestProviders";

import { CLIENT_ROUTES } from "@constants/routes";
import { LOCAL_STORAGE_KEYS } from "@constants/index";
import { BASE_URL, ENDPOINTS } from "@constants/services";

import { navigate } from "@utils/test/mocks/navigate";
import { consoleErrorSpy } from "@utils/test/mocks/consoleSpy";

import { TResendDetails } from "../VerifyEmail/type";

const { handleCreateErrorConfig } = createServer([
  {
    method: "post",
    url: `${BASE_URL}${ENDPOINTS.sendEmail}`,
  },
  `${BASE_URL}${ENDPOINTS.currentUser}`,
]);

describe("Sends email and redirects to verify email code page", () => {
  test("When the localStorage is empty", async () => {
    // const now = new Date().getTime();
    // const getLocalStorageGetItemValue = (savedAtSeconds: number) =>
    //   JSON.stringify({
    //     email: "test@gmail.com",
    //   } as unknown as Omit<TResendDetails, "timeSecondsLeft">);

    // localStorageGetItem.mockReturnValueOnce(getLocalStorageGetItemValue(savedAtSeconds));
    localStorageGetItem.mockReturnValueOnce(null);

    const user = userEvent.setup();
    render(<ResendEmail />, {
      wrapper: TestProviders,
    });

    expect(navigate).not.toHaveBeenCalled();
    expect(localStorageGetItem).toHaveBeenCalled();
    expect(localStorageSetItem).not.toHaveBeenCalled();

    const emailInput = screen.getByPlaceholderText(/email/i);
    const submitButton = screen.getByRole("button", { name: /send/i });

    const email = "test@gmail.com";
    await user.type(emailInput, email);
    await user.click(submitButton);

    await handleAssertLoadingAfterSubmitClick(submitButton);

    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(CLIENT_ROUTES.authVerifyEmail);

    expect(localStorageSetItem).toHaveBeenCalled();

    expect(localStorageSetItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.sendEmailCodeSuccess,
      JSON.stringify({
        email,
        savedAtTime: Date.now(),
      })
    );
  });

  test("When the localStorage is NOT empty", async () => {
    const email = "test@gmail.com";

    localStorageGetItem.mockReturnValueOnce(
      JSON.stringify({
        email,
      })
    );

    const user = userEvent.setup();
    render(<ResendEmail />, {
      wrapper: TestProviders,
    });
    expect(localStorageGetItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.sendEmailCodeSuccess);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const submitButton = screen.getByRole("button", { name: /send/i });

    expect(emailInput).toHaveValue(email);

    await user.click(submitButton);

    await handleAssertLoadingAfterSubmitClick(submitButton);

    expect(localStorageSetItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.sendEmailCodeSuccess,
      JSON.stringify({
        email,
        savedAtTime: Date.now(),
      })
    );
  });
});

test("Displays errors works correctly when the network request errors", async () => {
  handleCreateErrorConfig({
    url: `${BASE_URL}${ENDPOINTS.sendEmail}`,
    method: "post",
    statusCode: 402,
  });

  const user = userEvent.setup();
  render(<ResendEmail />, {
    wrapper: TestProviders,
  });

  const emailInput = screen.getByPlaceholderText(/email/i);
  const submitButton = screen.getByRole("button", { name: /send/i });

  expect(JSON.stringify(consoleErrorSpy.mock.calls)).not.toContain("Request failed with status code 402");
  expect(screen.queryByTestId("error")).not.toBeInTheDocument();

  await user.type(emailInput, "test@gmail.com");
  await user.click(submitButton);

  await handleAssertLoadingAfterSubmitClick(submitButton);

  expect(navigate).not.toHaveBeenCalled();
  expect(JSON.stringify(consoleErrorSpy.mock.calls)).toContain("Request failed with status code 402");
  expect(screen.getByTestId("error")).toBeInTheDocument();
});
