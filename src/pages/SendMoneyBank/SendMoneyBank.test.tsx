import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TestProviders from "@components/TestProviders";
import createServer from "@utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "@constants/services";

import SendMoneyBank from ".";
import { handleAssertLoadingState, handleTypeAmountRemarkAndSendMoney } from "@utils/test/assertUtils";

const BANKS = [
  {
    name: "Access Bank",
    code: "044",
    logo: "https://nigerianbanks.xyz/logo/access-bank.png",
  },
  {
    name: "ALAT by WEMA",
    code: "035A",
    logo: "https://nigerianbanks.xyz/logo/alat-by-wema.png",
  },
  {
    name: "ASO Savings and Loans",
    code: "401",
    logo: null,
  },
  {
    name: "Bowen Microfinance Bank",
    code: "50931",
    logo: "https://nigerianbanks.xyz/logo/default-image.png",
  },
  {
    name: "CEMCS Microfinance Bank",
    code: "50823",
    logo: null,
  },
  {
    name: "Citibank Nigeria",
    code: "023",
    logo: "https://nigerianbanks.xyz/logo/citibank-nigeria.png",
  },
  {
    name: "Ecobank Nigeria",
    code: "050",
    logo: "https://nigerianbanks.xyz/logo/ecobank-nigeria.png",
  },
  {
    name: "Airtel Smartcash PSB",
    code: "120004",
    logo: null,
  },
];

const VERIFIED_ACCOUNT_NAME = "TEST ACCOUNT NAME";

const CURRENT_USER_ID = 2000;

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
    url: `${BASE_URL}${ENDPOINTS.getAllBanks}`,
    res: () => {
      return {
        data: BANKS,
      };
    },
  },
  {
    url: `${BASE_URL}${ENDPOINTS.getBankVerify}`,
    res: () => {
      return {
        data: {
          account_name: VERIFIED_ACCOUNT_NAME,
        },
      };
    },
  },
  {
    url: `${BASE_URL}${ENDPOINTS.sendMoneyBank}`,
    method: "post",
  },
]);

let user: ReturnType<typeof userEvent.setup>;
beforeEach(() => {
  user = userEvent.setup();
});

// describe("Shows beneficiaries if any", () => {
//   test("When empty", async () => {
//     localStorageGetItem.mockReturnValueOnce(null);
//     render(<SendMoneyBank />, {
//       wrapper: TestProviders,
//     });
//     expect(localStorageGetItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.saveBeneficiary);

//     expect(screen.queryByTestId("user-block")).not.toBeInTheDocument();
//     expect(screen.getByText(/no beneficiaries/i)).toBeInTheDocument();
//   });

//   test("When not empty", async () => {
//     cleanup();

//     localStorageGetItem.mockReturnValueOnce(
//       JSON.stringify([
//         {
//           accountNumber: "1234567890",
//           fullName: VERIFIED_ACCOUNT_NAME,
//           bankName: BANKS[0].name,
//           type: "bank",
//           ownedBy: CURRENT_USER_ID.toString(),
//         },
//         {
//           accountNumber: "1234567890",
//           fullName: VERIFIED_ACCOUNT_NAME,
//           bankName: BANKS[1].name,
//           type: "bank",
//           ownedBy: CURRENT_USER_ID.toString(),
//         },
//         { type: "in-house", ownedBy: CURRENT_USER_ID.toString() },
//         { type: "mobile", ownedBy: CURRENT_USER_ID.toString() },
//       ] as TBeneficiary[])
//     );
//     render(<SendMoneyBank />, {
//       wrapper: TestProviders,
//     });

//     const recipientAccountNumberInput = screen.getByPlaceholderText(/recipient account number/i);

//     expect(localStorageGetItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.saveBeneficiary);

//     // await waitFor(() => {
//     screen.debug();
//     // });

//     // expect(screen.queryByTestId("user-block")).not.toBeInTheDocument();
//     // expect(screen.queryByText(/no beneficiaries/i)).not.toBeInTheDocument();

//     //   let allBeneficiaries = screen.getAllByTestId("beneficiary");
//     //   expect(allBeneficiaries).toHaveLength(2);
//     //   const beneficiaryElement1 = allBeneficiaries[0];
//     //   // expect(within(beneficiaryElement1).getByRole("img")).toHaveAttribute("src", USERS[0].data.avatar);
//     //   // expect(within(allBeneficiaries[1]).getByRole("img")).toHaveAttribute("src", USERS[1].data.avatar);
//     //   await user.click(beneficiaryElement1);
//     //   // expect(recipientAccountNumberInput).toHaveValue(ACCOUNT_NUMBER[0]);
//     //   await handleAssertLoadingState("get-user-by-account-number-loading");
//     //   // handleAssertUserBlock(USERS[0]);
//     //   expect(screen.queryByTestId("beneficiary")).not.toBeInTheDocument();
//   });
// });

test("Allow users to see list of banks to choose from", async () => {
  render(<SendMoneyBank />, {
    wrapper: TestProviders,
  });

  await handleAssertLoadingState("get-all-banks-loading");

  let allBankBlocks = screen.getAllByTestId("bank");
  expect(allBankBlocks).toHaveLength(BANKS.length);

  expect(screen.queryByTestId("current-bank")).not.toBeInTheDocument();

  const firstBankBlock = allBankBlocks[0];
  expect(firstBankBlock).toHaveTextContent(BANKS[0].name);
  await user.click(firstBankBlock);

  const currentBankBlock = screen.getByTestId("current-bank");
  expect(currentBankBlock).toHaveTextContent(BANKS[0].name);

  expect(screen.queryAllByTestId("bank")).toHaveLength(0);

  await user.click(within(currentBankBlock).getByTestId("remove"));

  expect(screen.queryByTestId("current-bank")).not.toBeInTheDocument();

  allBankBlocks = screen.getAllByTestId("bank");
  expect(allBankBlocks).toHaveLength(BANKS.length);

  await user.click(allBankBlocks[2]);

  expect(screen.getByTestId("current-bank")).toHaveTextContent(BANKS[2].name);
  expect(screen.queryAllByTestId("bank")).toHaveLength(0);
});

const handleAssertSelectBankAndTypeAccountNumber = async () => {
  await handleAssertLoadingState("get-all-banks-loading");

  await user.click(screen.getAllByTestId("bank")[0]);

  const recipientAccountNumberInput = screen.getByPlaceholderText("Recipient account number");

  await user.type(recipientAccountNumberInput, "1234567890");
  await handleAssertLoadingState("verify-account-loading");

  return {
    recipientAccountNumberInput,
  };
};

describe("Verify account number and bank", () => {
  test("Allow users to verify success", async () => {
    render(<SendMoneyBank />, {
      wrapper: TestProviders,
    });
    const recipientAccountNumberInput = screen.getByPlaceholderText("Recipient account number");

    await handleAssertLoadingState("get-all-banks-loading");
    expect(recipientAccountNumberInput).toBeDisabled();

    await user.click(screen.getAllByTestId("bank")[0]);
    expect(recipientAccountNumberInput).toBeEnabled();

    await user.type(recipientAccountNumberInput, "1234");
    expect(recipientAccountNumberInput).toHaveValue("1234");

    await user.click(within(screen.getByTestId("current-bank")).getByTestId("remove"));
    expect(recipientAccountNumberInput).toBeDisabled();
    expect(recipientAccountNumberInput).toHaveValue("");

    await user.click(screen.getAllByTestId("bank")[1]);
    expect(recipientAccountNumberInput).toBeEnabled();
    expect(recipientAccountNumberInput).toHaveValue("");

    await user.type(recipientAccountNumberInput, "123456789");
    expect(screen.queryByTestId("verify-account-loading")).not.toBeInTheDocument();
    expect(screen.queryByText(VERIFIED_ACCOUNT_NAME)).not.toBeInTheDocument();

    await user.clear(recipientAccountNumberInput);
    await user.type(recipientAccountNumberInput, "1234567890");
    await handleAssertLoadingState("verify-account-loading");

    expect(screen.getByText(VERIFIED_ACCOUNT_NAME)).toBeInTheDocument();
  });
  test("Prompt error on verify failure", async () => {
    handleCreateErrorConfig({
      url: `${BASE_URL}${ENDPOINTS.getBankVerify}`,
      statusCode: 404,
    });
    render(<SendMoneyBank />, {
      wrapper: TestProviders,
    });

    await handleAssertSelectBankAndTypeAccountNumber();

    expect(screen.getByTestId("verify-account-error")).toBeInTheDocument();
  });
});

test("Allow transfer for known users", async () => {
  render(<SendMoneyBank />, {
    wrapper: TestProviders,
  });

  const sendMoneyButton = screen.getByRole("button", { name: /send money/i });

  expect(sendMoneyButton).toBeDisabled();
  await handleAssertSelectBankAndTypeAccountNumber();
  expect(sendMoneyButton).toBeEnabled();

  await handleTypeAmountRemarkAndSendMoney();
});

test("Ensure prompt error if send money fails", async () => {
  handleCreateErrorConfig({
    url: `${BASE_URL}${ENDPOINTS.sendMoneyBank}`,
    method: "post",
    statusCode: 500,
  });
  render(<SendMoneyBank />, {
    wrapper: TestProviders,
  });

  const sendMoneyButton = screen.getByRole("button", { name: /send money/i });

  expect(sendMoneyButton).toBeDisabled();
  const { recipientAccountNumberInput } = await handleAssertSelectBankAndTypeAccountNumber();
  expect(sendMoneyButton).toBeEnabled();

  const amount = "2000";
  const remark = "Test remark note";
  const { amountInput, noteInput } = await handleTypeAmountRemarkAndSendMoney(amount, remark);
  expect(screen.getByTestId("send-money-error")).toBeInTheDocument();

  expect(recipientAccountNumberInput).toHaveValue("1234567890");
  expect(amountInput).toHaveValue(amount);
  expect(noteInput).toHaveValue(remark);

  await user.click(sendMoneyButton);
  await handleAssertLoadingState(sendMoneyButton);
  expect(screen.getByTestId("send-money-error")).toBeInTheDocument();
});
