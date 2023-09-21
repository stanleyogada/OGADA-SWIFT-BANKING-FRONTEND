import { render, screen } from "@testing-library/react";

import { SIGNIN_MODAL_URL_USER_QUERY_OPTIONS } from "@constants/index";
import TestProviders from "@components/TestProviders";

import Signin from "..";

const getSearchPrams = {
  get: jest.fn(() => {
    return SIGNIN_MODAL_URL_USER_QUERY_OPTIONS.noUser;
  }),
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(() => [getSearchPrams]),
}));

test("Ensures the form is empty on no-user opt", () => {
  render(<Signin />, {
    wrapper: TestProviders,
  });

  const phoneInput = screen.getByPlaceholderText(/phone number/i);
  const loginPasscodeInput = screen.getByPlaceholderText(/enter 6 digits login passcode/i);

  expect(phoneInput).toHaveValue("");
  expect(loginPasscodeInput).toHaveValue("");
});
