import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SigninModal from ".";
import TestProviders from "@components/TestProviders";
import { CLIENT_ROUTES, SIGNIN_MODAL_URL_USER_QUERY_OPTIONS } from "@constants/index";
import { navigate } from "@utils/test/mocks/navigate";

test("Add query string `user` the url or navigate on option select", async () => {
  render(<SigninModal />, { wrapper: TestProviders });
  const user = userEvent.setup();

  const [defaultUserRadio, noUserRadio, createUserRadio] = screen.getAllByTestId("radio");

  await user.click(defaultUserRadio);
  expect(window.location.search).toBe(`user=${SIGNIN_MODAL_URL_USER_QUERY_OPTIONS.defaultUser}`);

  await user.click(noUserRadio);
  expect(window.location.search).toBe(`user=${SIGNIN_MODAL_URL_USER_QUERY_OPTIONS.noUser}`);

  await user.click(createUserRadio);
  expect(navigate).toHaveBeenCalledWith(CLIENT_ROUTES.authSignup);
});
