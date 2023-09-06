import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Transaction from ".";
import TestProviders from "@components/TestProviders";
import createServer from "@utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "@constants/services";
import { handleAssertLoadingAfterSubmitClick } from "@utils/test/assertUtils";
import dayjs from "dayjs";

const response = [
  {
    transaction_id: 21,
    created_at: "2023-09-02T21:57:18.999Z",
    transaction_type: "in-house",
    amount: "280.00",
    is_success: true,
    account_id: 19,
    sender_account_number: "9012345619",
    receiver_account_number: "n/a",
    is_deposit: true,
  },
  {
    transaction_id: 21,
    created_at: "2023-09-04T21:57:18.999Z",
    transaction_type: "banks",
    amount: "280.00",
    is_success: false,
    account_id: 19,
    sender_account_number: "9012345619",
    receiver_account_number: "n/a",
    is_deposit: false,
  },
  {
    transaction_id: 21,
    created_at: "2023-09-02T21:57:18.999Z",
    transaction_type: "banks",
    amount: "280.00",
    is_success: true,
    account_id: 19,
    sender_account_number: "9012345619",
    receiver_account_number: "n/a",
    is_deposit: false,
  },
  {
    transaction_id: 21,
    created_at: "2023-09-02T21:57:18.999Z",
    transaction_type: "banks",
    amount: "280.00",
    is_success: true,
    account_id: 19,
    sender_account_number: "9012345619",
    receiver_account_number: "n/a",
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
  expect(initialCards[0]).toHaveTextContent(new RegExp(`Daily in-house`));
  expect(initialCards[0]).toHaveTextContent(/saturday, sep 2023/i);
  expect(initialCards[0]).toHaveTextContent(/\+N280.00/);
  expect(initialCards[0]).toHaveTextContent(/successful/);

  expect(initialCards[1]).toHaveTextContent(new RegExp(`Daily banks`));
  expect(initialCards[1]).toHaveTextContent(/monday, sep 2023/i);
  expect(initialCards[1]).toHaveTextContent(/-N280.00/);
  expect(initialCards[1]).toHaveTextContent(/failed/);

  const user = userEvent.setup();

  const button = screen.getByRole("button", { name: /load more/i });
  await user.click(button);
  await handleAssertLoadingAfterSubmitClick(button);
  expect(await screen.findAllByTestId("transaction-card")).toHaveLength(8);
});
