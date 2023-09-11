import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from ".";
import TestProviders from "@components/TestProviders";
import { localStorageRemoveItem } from "@utils/test/mocks/localStorage";

test("Have Sign out button working", async () => {
  render(<Home />, {
    wrapper: TestProviders,
  });

  const signOutButton = screen.getByTestId("sign-out-button");
  const user = userEvent.setup();

  await user.click(signOutButton);

  expect(localStorageRemoveItem).toHaveBeenCalled();
  expect(window.location.reload).toHaveBeenCalled();
});
