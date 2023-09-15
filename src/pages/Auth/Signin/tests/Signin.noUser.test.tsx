import { render } from "@testing-library/react";

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

test("should first", () => {
  render(<Signin />, {
    wrapper: TestProviders,
  });
});
