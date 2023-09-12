import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestProviders from "@components/TestProviders";
import { localStorageRemoveItem } from "@utils/test/mocks/localStorage";
import { CLIENT_ROUTES } from "@constants/routes";
import createServer from "@utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "@constants/services";

import Home from ".";

import type { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import type { TUser } from "@services/users/types";

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
    {
      elem: screen.getByRole("link", {
        name: /add money/i,
      }),
      link: CLIENT_ROUTES.addMoney,
    },
    {
      elem: screen.getByRole("link", {
        name: /transfer/i,
      }),
      link: CLIENT_ROUTES.sendMoneyInHouse,
    },
    {
      elem: screen.getByRole("link", {
        name: /opay/i,
      }),
      link: CLIENT_ROUTES.sendMoneyInHouse,
    },
    {
      elem: screen.getByRole("link", {
        name: /bank/i,
      }),
      link: CLIENT_ROUTES.sendMoneyBank,
    },
    {
      elem: screen.getByRole("link", {
        name: /mobile/i,
      }),
      link: CLIENT_ROUTES.sendMoneyMobile,
    },
  ];

  for (const { elem, link } of links) {
    await user.click(elem);
    expect(elem).toHaveAttribute("href", link);
  }
});

const handleCreateServer = (nickname?: string) => {
  createServer([
    {
      url: `${BASE_URL}${ENDPOINTS.currentUser}`,
      res: () =>
        ({
          status: "success",
          data: {
            id: 1,
            created_at: "2023-09-03T02:17:07.441Z",
            updated_at: "2023-09-03T02:17:07.441Z",
            first_name: "John",
            last_name: "Doe",
            nickname,
            email: "johnDoe@gmail.com",
            email_is_verified: true,
            phone: "9234567890",
            // login_passcode: "$2b$10$PVLvS0iw0FZA/RNOEx7XKOJzW3gzjizVJgWp2dM7IqCUpiDrua7Oe", // TODO: Remove this from the backend endpoint
            // transfer_pin: "$2b$10$S.Tw3vvZwtd0aUUJAhDukOr95gxo8n5mqzmNziow2oFVtkNFHIFtu", // TODO: Remove this from the backend endpoint
          },
        } as {
          status: string;
          data: TUser;
        }),
    },
  ]);
};

describe("When user has NO nickname", () => {
  handleCreateServer();

  test("Displays the user's information with the First and Last Name", async () => {
    render(<Home />, {
      wrapper: TestProviders,
    });

    await screen.findByRole("heading", {
      name: /hello, john doe/i,
    });
  });
});

describe("When user has a nickname", () => {
  handleCreateServer("the best programmer");

  test("Displays the user's nickname", async () => {
    render(<Home />, {
      wrapper: TestProviders,
    });

    await screen.findByRole("heading", {
      name: /hello, the best programmer/i,
    });
  });
});
