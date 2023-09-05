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
    created_at: new Date().toISOString(),
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
    created_at: "2023-09-02T21:57:18.999Z",
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

  for (let i = 0; i < response.length; i++) {
    expect(initialCards[i]).toHaveTextContent(new RegExp(`Daily ${response[i].transaction_type}`));

    if (!response[i].is_deposit) {
      expect(initialCards[i]).toHaveTextContent(new RegExp("-N280.00"));
    } else {
      expect(initialCards[i]).toHaveTextContent(new RegExp("N280.00"));
    }

    if (response[i].is_success) {
      expect(initialCards[i]).toHaveTextContent(/successful/);
    } else {
      expect(initialCards[i]).toHaveTextContent("failed");
    }
  }

  expect(initialCards[0]).toHaveTextContent(/Daily in-house/);
  expect(initialCards[0]).toHaveTextContent(/successful/);

  const user = userEvent.setup();

  const button = screen.getByRole("button", { name: /load more/i });
  await user.click(button);
  await handleAssertLoadingAfterSubmitClick(button);
  expect(await screen.findAllByTestId("transaction-card")).toHaveLength(8);
});
