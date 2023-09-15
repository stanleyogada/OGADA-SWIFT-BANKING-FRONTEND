import { render, screen } from "@testing-library/react";

import { SIGNIN_MODAL_URL_USER_QUERY_OPTIONS } from "@constants/index";
import TestProviders from "@components/TestProviders";

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

test("should first", () => {
  render(<Signin />, {
    wrapper: TestProviders,
  });
});
