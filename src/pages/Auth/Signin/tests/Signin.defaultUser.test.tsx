import { render, screen, waitFor } from "@testing-library/react";

import { SIGNIN_MODAL_URL_USER_QUERY_OPTIONS, TEST_LOG_PREFIX } from "@constants/index";
import TestProviders from "@components/TestProviders";
import createServer from "@utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "@constants/services";
import { handleAssertLoadingState } from "@utils/test/assertUtils";
import { consoleInfoSpy } from "@utils/test/mocks/consoleSpy";

import Signin from "..";

const getSearchParams = {
  get: jest.fn(() => {
    return SIGNIN_MODAL_URL_USER_QUERY_OPTIONS.defaultUser;
  }),
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(() => [getSearchParams]),
}));

const responseDefault = {
  login_passcode: "123456",
  phone: "1234567890",
};

createServer([
  {
    url: `${BASE_URL}${ENDPOINTS.defaultUserLoginInfo}`,
    res() {
      return {
        data: responseDefault,
      };
    },
  },
  {
    method: "post",
    url: `${BASE_URL}${ENDPOINTS.signIn}`,
    res() {
      return {
        token: "1234567890",
        data: {
          email_is_verified: true,
        },
      };
    },
  },
  `${BASE_URL}${ENDPOINTS.currentUser}`,
]);

test("Ensures the form is NOT empty on default user opt", async () => {
  render(<Signin />, {
    wrapper: TestProviders,
  });

  const phoneInput = screen.getByPlaceholderText(/phone number/i);
  const loginPasscodeInput = screen.getByPlaceholderText(/enter 6 digits login passcode/i);

  expect(phoneInput).toHaveValue("");
  expect(loginPasscodeInput).toHaveValue("");

  await handleAssertLoadingState("default-user-loading");

  expect(phoneInput).toHaveValue(responseDefault.phone);
  expect(loginPasscodeInput).toHaveValue(responseDefault.login_passcode);

  // Automatically login with default user (WHICH ASSERTS THE SUBMIT BUTTON WAS AUTO CLICKED)
  await waitFor(() => {
    expect(consoleInfoSpy).toHaveBeenCalledWith(TEST_LOG_PREFIX, "auto-submit");
  });
});
