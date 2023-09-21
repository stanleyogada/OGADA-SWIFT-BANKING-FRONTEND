import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestProviders from "@components/TestProviders";
import { localStorageRemoveItem } from "@utils/test/mocks/localStorage";
import { CLIENT_ROUTES } from "@constants/routes";
import createServer, { THandlerConfig } from "@utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "@constants/services";

import Home from ".";

import type { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { S } from "msw/lib/glossary-de6278a9";
import formatToCurrency from "@utils/formatToCurrency";
import { handleAssertLoadingState } from "@utils/test/assertUtils";
import { DEFAULT_USER_AVATAR } from "@constants/index";

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
      link: CLIENT_ROUTES.transactions,
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

const BALANCE = {
  normal: "10500000.00",
  cashback: "900.00",
};
const ACCOUNT_NUMBER = "9012345639";

const handleCreateServer = (nickname?: string, avatar?: string) => {
  const allConfig = [
    {
      url: `${BASE_URL}${ENDPOINTS.currentUser}`,
      res: () => ({
        data: {
          first_name: "John",
          last_name: "Doe",
          nickname,
          avatar,

          // login_passcode: "$2b$10$PVLvS0iw0FZA/RNOEx7XKOJzW3gzjizVJgWp2dM7IqCUpiDrua7Oe", // TODO: Remove this from the backend endpoint
          // transfer_pin: "$2b$10$S.Tw3vvZwtd0aUUJAhDukOr95gxo8n5mqzmNziow2oFVtkNFHIFtu", // TODO: Remove this from the backend endpoint
        },
      }),
    },
    {
      url: `${BASE_URL}${ENDPOINTS.currentUserAccounts}`,
      res: () => ({
        data: [
          {
            account_number: ACCOUNT_NUMBER,
            balance: BALANCE.normal,
            type: "NORMAL",
          },
          {
            account_number: ACCOUNT_NUMBER,
            balance: BALANCE.cashback,
            type: "CASHBACK",
          },
        ],
      }),
    },
  ];

  createServer(allConfig as THandlerConfig[]);
};

describe("When user has a nickname and has an avatar", () => {
  const avatar = "https://avatars.githubusercontent.com/u/47280571?v=4";
  handleCreateServer("the best programmer", avatar);

  test("Displays the user's nickname", async () => {
    render(<Home />, {
      wrapper: TestProviders,
    });

    await screen.findByRole("heading", {
      name: /hello, the best programmer/i,
    });

    screen.getByText(ACCOUNT_NUMBER);

    const img = screen.getByRole("img", {
      name: /john doe/i,
    });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", avatar);
    expect(img).toHaveAttribute("width", "50");
    expect(img).toHaveAttribute("height", "50");
    expect(img).toHaveStyle("border-radius: 50%");
  });
});

describe("When user has NO nickname and NO avatar", () => {
  handleCreateServer();

  test("Displays the user's information with the First and Last Name", async () => {
    render(<Home />, {
      wrapper: TestProviders,
    });

    await handleAssertLoadingState("home-loading-state");

    await screen.findByRole("heading", {
      name: /hello, john doe/i,
    });
    const img = screen.getByRole("img", {
      name: /john doe/i,
    });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", DEFAULT_USER_AVATAR);

    const getBalance = async (isHidden?: boolean) => {
      const normalBalance = await screen[isHidden ? "queryByText" : "findByText"](formatToCurrency(BALANCE.normal));
      const cashBackText = await screen[isHidden ? "queryByText" : "findByText"](/\+ cashback > /i);
      const cashbackBalance = await screen[isHidden ? "queryByText" : "findByText"](
        new RegExp(formatToCurrency(BALANCE.cashback), "i")
      );

      if (!isHidden) {
        expect(normalBalance).toBeInTheDocument();
        expect(cashBackText).toBeInTheDocument();
        expect(cashbackBalance).toBeInTheDocument();
        expect(screen.queryByText(/\*{4,4}/i)).not.toBeInTheDocument();

        return;
      }

      expect(screen.getByText(/\*{4,4}/i)).toBeInTheDocument();

      expect(normalBalance).not.toBeInTheDocument();
      expect(cashBackText).not.toBeInTheDocument();
      expect(cashbackBalance).not.toBeInTheDocument();
    };

    await getBalance();

    const hideBalanceButton = screen.getByTestId("hide-balance-button");
    await user.click(hideBalanceButton);

    await getBalance(true);

    await user.click(hideBalanceButton);
    await getBalance();
  });
});
