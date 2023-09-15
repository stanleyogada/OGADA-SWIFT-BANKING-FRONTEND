import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SigninModal from ".";
import TestProviders from "@components/TestProviders";
import { CLIENT_ROUTES, SIGNIN_MODAL_URL_USER_QUERY_OPTIONS } from "@constants/index";
import { navigate } from "@utils/test/mocks/navigate";
import { consoleInfoSpy } from "@utils/test/mocks/consoleSpy";

test("Add query string `user` the url or navigate on option select", async () => {
  render(<SigninModal />, { wrapper: TestProviders });
  const user = userEvent.setup();

  const [defaultUserRadio, noUserRadio, createUserRadio] = screen.getAllByTestId("radio");

  expect(consoleInfoSpy).not.toHaveBeenCalled();

  await user.click(defaultUserRadio);
  expect(consoleInfoSpy).toHaveBeenCalledWith(
    "setSearchParams",
    "user",
    SIGNIN_MODAL_URL_USER_QUERY_OPTIONS.defaultUser
  );
  expect(consoleInfoSpy).toHaveBeenCalledTimes(1);

  await user.click(noUserRadio);
  expect(consoleInfoSpy).toHaveBeenCalledWith("setSearchParams", "user", SIGNIN_MODAL_URL_USER_QUERY_OPTIONS.noUser);
  expect(consoleInfoSpy).toHaveBeenCalledTimes(2);

  await user.click(createUserRadio);
  expect(consoleInfoSpy).toHaveBeenCalledTimes(2);
  expect(navigate).toHaveBeenCalledWith(CLIENT_ROUTES.authSignup);
});
