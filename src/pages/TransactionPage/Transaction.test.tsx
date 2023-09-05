import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Transaction from ".";
import TestProviders from "@components/TestProviders";
import createServer from "@utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "@constants/services";
import { handleAssertLoadingAfterSubmitClick } from "@utils/test/assertUtils";

const response = [
  {
    transaction_id: 21,
    created_at: "2023-09-02T21:57:18.999Z",
    transaction_number: "TRX-202392225718-135-1693691838998",
    is_success: true,
    type: "cashback",
    amount: "280.00",
    charge: "0.00",
    account_id: 19,
    transactions_banks_id: 1,
    bank_account_full_name: "Bank User Full Name",
    bank_account_number: "1234567890",
    bank_name: "Bank Name",
    session_id: "SES-202392225718-531-1693691838998",
    remark: "Send money to my costumer's bank",
    sender_account_full_name: "Offer MoneyMan2",
    sender_account_number: "9012345619",
    is_deposit: false,
  },
  {
    transaction_id: 21,
    created_at: "2023-09-02T21:57:18.999Z",
    transaction_number: "TRX-202392225718-135-1693691838998",
    is_success: true,
    type: "transfer",
    amount: "280.00",
    charge: "0.00",
    account_id: 19,
    transactions_banks_id: 1,
    bank_account_full_name: "Bank User Full Name",
    bank_account_number: "1234567890",
    bank_name: "Bank Name",
    session_id: "SES-202392225718-531-1693691838998",
    remark: "Send money to my costumer's bank",
    sender_account_full_name: "Offer MoneyMan2",
    sender_account_number: "9012345619",
    is_deposit: false,
  },
  {
    transaction_id: 21,
    created_at: "2023-09-02T21:57:18.999Z",
    transaction_number: "TRX-202392225718-135-1693691838998",
    is_success: true,
    type: "data",
    amount: "280.00",
    charge: "0.00",
    account_id: 19,
    transactions_banks_id: 1,
    bank_account_full_name: "Bank User Full Name",
    bank_account_number: "1234567890",
    bank_name: "Bank Name",
    session_id: "SES-202392225718-531-1693691838998",
    remark: "Send money to my costumer's bank",
    sender_account_full_name: "Offer MoneyMan2",
    sender_account_number: "9012345619",
    is_deposit: false,
  },
  {
    transaction_id: 21,
    created_at: "2023-09-02T21:57:18.999Z",
    transaction_number: "TRX-202392225718-135-1693691838998",
    is_success: true,
    type: "deposit",
    amount: "280.00",
    charge: "0.00",
    account_id: 19,
    transactions_banks_id: 1,
    bank_account_full_name: "Bank User Full Name",
    bank_account_number: "1234567890",
    bank_name: "Bank Name",
    session_id: "SES-202392225718-531-1693691838998",
    remark: "Send money to my costumer's bank",
    sender_account_full_name: "Offer MoneyMan2",
    sender_account_number: "9012345619",
    is_deposit: false,
  },
];

createServer([
  {
    url: "http://localhost:8000/trans",
    res() {
      return response;
    },
  },
  `${BASE_URL}${ENDPOINTS.currentUser}`,
]);

test("Renders two cards on load and fetches more data on button click", async () => {
  render(
    <TestProviders>
      <Transaction />
    </TestProviders>
  );

  const initialCards = await screen.findAllByTestId("transaction-card");
  expect(initialCards).toHaveLength(4);

  for (let i = 0; i < initialCards.length; i++) {
    expect(initialCards[i]).toHaveTextContent(new RegExp(response[i].type, "i"));
    expect(initialCards[i]).toHaveTextContent(new RegExp(response[i].created_at, "i"));
  }

  const user = userEvent.setup();

  const button = screen.getByRole("button", { name: /load more/i });
  await user.click(button);
  await handleAssertLoadingAfterSubmitClick(button);
  expect(await screen.findAllByTestId("transaction-card")).toHaveLength(8);
});
