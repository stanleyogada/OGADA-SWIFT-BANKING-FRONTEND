import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TestProviders from "@components/TestProviders";
import { handleAssertLoadingState, handleTypeAmountRemarkAndSendMoney } from "@utils/test/assertUtils";
import createServer from "@utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "@constants/services";

import SendMoneyInHouse from ".";
import { localStorageGetItem, localStorageSetItem } from "@utils/test/mocks/localStorage";
import { LOCAL_STORAGE_KEYS } from "@constants/index";
import { TBeneficiary } from "@components/SendMoney/Beneficiaries/types";

const ACCOUNT_NUMBER = ["4286351832", "1234567890"];

const USERS = [
  {
    data: {
      id: 1000,
      created_at: "2023-09-12T13:09:25.387Z",
      updated_at: "2023-09-12T13:09:25.387Z",
      first_name: "Default",
      last_name: "User",
      middle_name: "Normal",
      nickname: null,
      email: "defaultNormalUser@email.com",
      email_is_verified: true,
      phone: ACCOUNT_NUMBER[0],
      avatar: "https://i.pravatar.cc/150?u=4286351832",
    },
  },
  {
    data: {
      id: 2000,
      created_at: "2023-09-12T13:09:25.387Z",
      updated_at: "2023-09-12T13:09:25.387Z",
      first_name: "Faker",
      last_name: "Guy",
      middle_name: "Normal",
      nickname: "Tall guy",
      email: "TallDude@email.com",
      email_is_verified: true,
      phone: ACCOUNT_NUMBER[1],
      avatar: "https://i.pravatar.cc/150?u=1234567890",
    },
  },
];

const CURRENT_USER_ID = 1000;

let user: ReturnType<typeof userEvent.setup>;

beforeEach(() => (user = userEvent.setup()));

const { handleCreateErrorConfig } = createServer([
  {
    url: `${BASE_URL}${ENDPOINTS.currentUser}`,
    res() {
      return {
        data: {
          id: CURRENT_USER_ID,
        },
      };
    },
  },
  {
    url: `${BASE_URL}${ENDPOINTS.getUserByPhone}/${ACCOUNT_NUMBER[0]}`,
    res: () => {
      return {
        data: USERS[0].data,
      };
    },
  },
  {
    url: `${BASE_URL}${ENDPOINTS.getUserByPhone}/${ACCOUNT_NUMBER[1]}`,
    res: () => {
      return {
        data: USERS[1].data,
      };
    },
  },
  {
    url: `${BASE_URL}${ENDPOINTS.sendMoneyInHouse}`,
    method: "post",
  },
]);

const handleAssertUserBlock = (user: typeof USERS[0]) => {
  let userBlock = screen.getByTestId("user-block");

  within(userBlock).getByText(new RegExp(`${user.data.first_name} ${user.data.last_name}`, "i"));
  expect(within(userBlock).getByText(user.data.phone)).toBeInTheDocument();

  let avatarImage = within(userBlock).getByRole("img");
  expect(avatarImage).toHaveAttribute("src", user.data.avatar);
};

describe("Shows beneficiaries and filter correctly if any", () => {
  test("When empty", async () => {
    localStorageGetItem.mockReturnValueOnce(null);
    render(<SendMoneyInHouse />, {
      wrapper: TestProviders,
    });
    expect(localStorageGetItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.saveBeneficiary);

    expect(screen.queryByTestId("user-block")).not.toBeInTheDocument();
    expect(screen.getByText(/no beneficiaries/i)).toBeInTheDocument();
  });

  test("When not empty", async () => {
    localStorageGetItem.mockReturnValueOnce(
      JSON.stringify([
        {
          accountNumber: ACCOUNT_NUMBER[0],
          avatar: USERS[0].data.avatar,
          fullName: `${USERS[0].data.first_name} ${USERS[0].data.last_name}`,
          type: "in-house",
          ownedBy: CURRENT_USER_ID.toString(),
        },
        {
          accountNumber: ACCOUNT_NUMBER[1],
          avatar: USERS[1].data.avatar,
          fullName: `${USERS[1].data.first_name} ${USERS[1].data.last_name}`,
          type: "in-house",
          ownedBy: CURRENT_USER_ID.toString(),
        },
        { type: "bank", ownedBy: CURRENT_USER_ID.toString() },
        { type: "mobile", ownedBy: CURRENT_USER_ID.toString() },
      ] as TBeneficiary[])
    );

    render(<SendMoneyInHouse />, {
      wrapper: TestProviders,
    });
    const user = userEvent.setup();
    expect(localStorageGetItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.saveBeneficiary);

    const recipientAccountNumberInput = screen.getByPlaceholderText(/recipient account number/i);

    expect(screen.queryByTestId("user-block")).not.toBeInTheDocument();
    expect(screen.queryByText(/no beneficiaries/i)).not.toBeInTheDocument();

    let allBeneficiaries = screen.getAllByTestId("beneficiary");
    expect(allBeneficiaries).toHaveLength(2);

    const beneficiaryElement1 = allBeneficiaries[0];

    // Beneficiaries is reversed
    expect(within(beneficiaryElement1).getByRole("img")).toHaveAttribute("src", USERS[1].data.avatar);
    expect(within(allBeneficiaries[1]).getByRole("img")).toHaveAttribute("src", USERS[0].data.avatar);

    await user.click(beneficiaryElement1);

    expect(recipientAccountNumberInput).toHaveValue(ACCOUNT_NUMBER[1]);

    await handleAssertLoadingState("get-user-by-account-number-loading");
    handleAssertUserBlock(USERS[1]);

    expect(screen.queryByTestId("beneficiary")).not.toBeInTheDocument();
  });
});

test("Allow transfer for known users", async () => {
  render(<SendMoneyInHouse />, {
    wrapper: TestProviders,
  });

  let recipientAccountNumberInput = screen.getByPlaceholderText(/recipient account number/i);

  expect(screen.queryByTestId("user-block")).not.toBeInTheDocument();

  await user.type(recipientAccountNumberInput, ACCOUNT_NUMBER[0].slice(0, -1));
  expect(screen.queryByTestId("user-block")).not.toBeInTheDocument();

  await user.type(recipientAccountNumberInput, ACCOUNT_NUMBER[0].slice(-1));
  expect(recipientAccountNumberInput).toHaveValue(ACCOUNT_NUMBER[0]);

  await handleAssertLoadingState("get-user-by-account-number-loading");

  handleAssertUserBlock(USERS[0]);

  //
  //
  cleanup();
  //
  //

  render(<SendMoneyInHouse />, {
    wrapper: TestProviders,
  });

  const sendMoneyButton = screen.getByRole("button", { name: /send money/i });
  recipientAccountNumberInput = screen.getByPlaceholderText(/recipient account number/i);

  expect(sendMoneyButton).toBeDisabled();

  await user.type(recipientAccountNumberInput, ACCOUNT_NUMBER[1]);
  expect(recipientAccountNumberInput).toHaveValue(ACCOUNT_NUMBER[1]);

  await handleAssertLoadingState("get-user-by-account-number-loading");

  expect(sendMoneyButton).toBeEnabled();

  handleAssertUserBlock(USERS[1]);

  const beneficiariesLSValues = [
    LOCAL_STORAGE_KEYS.saveBeneficiary,
    JSON.stringify([
      {
        accountNumber: ACCOUNT_NUMBER[1],
        avatar: USERS[1].data.avatar,
        fullName: `${USERS[1].data.first_name} ${USERS[1].data.last_name}`,
        type: "in-house",
        ownedBy: CURRENT_USER_ID.toString(),
      },
    ]),
  ];

  expect(localStorageSetItem).not.toHaveBeenCalledWith(...beneficiariesLSValues);

  const { amountInput, noteInput } = await handleTypeAmountRemarkAndSendMoney();

  // The real implementation has a setTimeout of 5ms before clearing the form
  await waitFor(() => {
    expect(recipientAccountNumberInput).toHaveValue("");
    expect(amountInput).toHaveValue("");
    expect(noteInput).toHaveValue("");

    expect(screen.queryByTestId("user-block")).not.toBeInTheDocument();
    expect(screen.getByTestId("send-money-success")).toBeInTheDocument();
    expect(localStorageSetItem).toHaveBeenCalledWith(...beneficiariesLSValues);
  });
});

test("DISALLOW transfer for UNKNOWN users", async () => {
  handleCreateErrorConfig({
    url: `${BASE_URL}${ENDPOINTS.getUserByPhone}/${ACCOUNT_NUMBER[0]}`,
    statusCode: 404,
  });

  render(<SendMoneyInHouse />, {
    wrapper: TestProviders,
  });

  const recipientAccountNumberInput = screen.getByPlaceholderText(/recipient account number/i);
  const sendMoneyButton = screen.getByRole("button", { name: /send money/i });

  await user.type(recipientAccountNumberInput, ACCOUNT_NUMBER[0]);

  expect(sendMoneyButton).toBeDisabled();

  await handleAssertLoadingState("get-user-by-account-number-loading");

  expect(sendMoneyButton).toBeDisabled();
  expect(screen.queryByTestId("user-block")).not.toBeInTheDocument();

  expect(screen.getByTestId("get-user-by-account-number-error")).toBeInTheDocument();
});

test("Ensure prompt error if send money fails", async () => {
  handleCreateErrorConfig({
    url: `${BASE_URL}${ENDPOINTS.sendMoneyInHouse}`,
    method: "post",
    statusCode: 500,
  });

  render(<SendMoneyInHouse />, {
    wrapper: TestProviders,
  });

  const recipientAccountNumberInput = screen.getByPlaceholderText(/recipient account number/i);
  const sendMoneyButton = screen.getByRole("button", { name: /send money/i });

  await user.type(recipientAccountNumberInput, ACCOUNT_NUMBER[0]);

  expect(sendMoneyButton).toBeDisabled();

  await handleAssertLoadingState("get-user-by-account-number-loading");

  expect(sendMoneyButton).toBeEnabled();
  expect(screen.getByTestId("user-block")).toBeInTheDocument();

  const amount = "2000";
  const remark = "Test remark note";
  const { amountInput, noteInput } = await handleTypeAmountRemarkAndSendMoney(amount, remark);

  expect(screen.getByTestId("send-money-error")).toBeInTheDocument();
  expect(recipientAccountNumberInput).toHaveValue(ACCOUNT_NUMBER[0]);
  expect(amountInput).toHaveValue(amount);
  expect(noteInput).toHaveValue(remark);

  await user.click(sendMoneyButton);
  await handleAssertLoadingState(sendMoneyButton);

  expect(screen.getByTestId("send-money-error")).toBeInTheDocument();
});
