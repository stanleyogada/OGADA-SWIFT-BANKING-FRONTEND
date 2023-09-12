import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from ".";
import TestProviders from "@components/TestProviders";
import { localStorageRemoveItem } from "@utils/test/mocks/localStorage";
import { CLIENT_ROUTES } from "@constants/routes";

import type { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup();
});

test("Have Sign out button working", async () => {
  render(<Home />, {
    wrapper: TestProviders,
  });

  const signOutButton = screen.getByTestId("sign-out-button");
  const icon = within(signOutButton).getByRole("img");
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveAttribute("width", "25");
  expect(icon).toHaveAttribute("height", "25");

  await user.click(signOutButton);

  expect(localStorageRemoveItem).toHaveBeenCalled();
  expect(window.location.reload).toHaveBeenCalled();
});

test("Have all links wired up correctly", async () => {
  render(<Home />, {
    wrapper: TestProviders,
  });

  const links = [
    {
      elem: screen.getByRole("link", {
        name: /transaction history >/i,
      }),
      link: CLIENT_ROUTES.transactionPage,
    },
    { elem: screen.getByTestId("add-money-link"), link: CLIENT_ROUTES.addMoney },
    { elem: screen.getByTestId("transfer-link"), link: CLIENT_ROUTES.sendMoneyInHouse },
    { elem: screen.getByTestId("in-house-link"), link: CLIENT_ROUTES.sendMoneyInHouse },
    { elem: screen.getByTestId("bank-link"), link: CLIENT_ROUTES.sendMoneyBank },
    { elem: screen.getByTestId("mobile-link"), link: CLIENT_ROUTES.sendMoneyMobile },
  ];

  for (const { elem, link } of links) {
    await user.click(elem);
    expect(elem).toHaveAttribute("href", link);
  }
});
