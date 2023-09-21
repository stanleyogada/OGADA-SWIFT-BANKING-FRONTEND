import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TestProviders from "@components/TestProviders";
import createServer from "@utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "@constants/services";
import { handleAssertLoadingState } from "@utils/test/assertUtils";
import { navigate } from "@utils/test/mocks/navigate";

import Transactions from ".";

const RESPONSE_DATA = [
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
    url: `${BASE_URL}${ENDPOINTS.transactions}`,
    res() {
      return {
        data: RESPONSE_DATA,
      };
    },
  },
  `${BASE_URL}${ENDPOINTS.currentUser}`,
]);

test("Renders two cards on load and fetches more data on button click", async () => {
  render(
    <TestProviders>
      <Transactions />
    </TestProviders>
  );

  const initialCards = await screen.findAllByTestId("transaction-card");
  expect(initialCards).toHaveLength(4);
  expect(initialCards[0]).toHaveTextContent(new RegExp(`in-house`));
  expect(initialCards[0]).toHaveTextContent(/saturday, sep 2023/i);
  expect(initialCards[0]).toHaveTextContent(/\+N280.00/);
  expect(initialCards[0]).toHaveTextContent(/successful/);

  expect(initialCards[1]).toHaveTextContent(new RegExp(`banks`));
  expect(initialCards[1]).toHaveTextContent(/monday, sep 2023/i);
  expect(initialCards[1]).toHaveTextContent(/-N280.00/);
  expect(initialCards[1]).toHaveTextContent(/failed/);

  const user = userEvent.setup();

  const button = screen.getByRole("button", { name: /load more/i });
  await user.click(button);
  await handleAssertLoadingState(button);
  expect(await screen.findAllByTestId("transaction-card")).toHaveLength(8);

  await user.click(initialCards[0]);
  expect(navigate).toHaveBeenCalled();
});
