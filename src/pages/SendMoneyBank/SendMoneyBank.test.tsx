import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TestProviders from "@components/TestProviders";
import createServer from "@utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "@constants/services";

import SendMoneyBank from ".";
import { handleAssertLoadingState } from "@utils/test/assertUtils";

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

createServer([
  {
    url: `${BASE_URL}${ENDPOINTS.getAllBanks}`,
    res: () => {
      return {
        data: BANKS,
      };
    },
  },
]);

test("Allow users to see list of banks to choose from", async () => {
  render(<SendMoneyBank />, {
    wrapper: TestProviders,
  });
  const user = userEvent.setup();

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
