import { BASE_URL, ENDPOINTS } from "@constants/services";
import { render, screen } from "@testing-library/react";
import SendMoneyBank from ".";
import userEvent from "@testing-library/user-event";
import createServer from "@utils/test/createServer";
import TestProviders from "@components/TestProviders";

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

test("filter data based on input", async () => {
  render(<SendMoneyBank />, {
    wrapper: TestProviders,
  });

  const recipientInput = await screen.findByPlaceholderText("search bank");

  expect(await screen.findAllByTestId("bank")).toHaveLength(8);

  await user.type(recipientInput, "access");
  expect(screen.getAllByTestId("bank")).toHaveLength(1);
  await user.clear(recipientInput);
  await user.type(recipientInput, "micro");
  expect(screen.getAllByTestId("bank")).toHaveLength(2);
});
