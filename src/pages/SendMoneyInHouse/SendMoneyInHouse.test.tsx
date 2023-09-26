import { render, screen, within } from "@testing-library/react";

import TestProviders from "@components/TestProviders";

import SendMoneyInHouse from ".";
import userEvent from "@testing-library/user-event";
import { handleAssertLoadingState } from "@utils/test/assertUtils";
import createServer from "@utils/test/createServer";
import { ENDPOINTS } from "@constants/services";

const PHONE = {
  CORRECT: ["4286351832", "1234567890"],
  INCORRECT: ["1112223334", "0202020202"],
};

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
      phone: PHONE.CORRECT[0],
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
      phone: PHONE.CORRECT[1],
      avatar: "https://i.pravatar.cc/150?u=1234567890",
    },
  },
];

let user: ReturnType<typeof userEvent.setup>;

beforeEach(() => (user = userEvent.setup()));

createServer([`${ENDPOINTS.currentUser}`]);

test("Allow transfer for known users", async () => {
  render(<SendMoneyInHouse />, {
    wrapper: TestProviders,
  });

  const phoneInput = screen.getByPlaceholderText(/phone/i);

  // const incompleteCorrectPhone = PHONE.CORRECT[0].slice(0, -1);

  await user.type(phoneInput, PHONE.CORRECT[0]);

  console.log((phoneInput as any).value);

  expect(phoneInput).toHaveValue(PHONE.CORRECT[0]);

  await handleAssertLoadingState("get-user-by-phone-loading");

  const userBlock = screen.getByTestId("user-block");
  const fullNameElement = within(userBlock).getByTestId("user-full-name");
  expect(fullNameElement).toHaveTextContent(`${USERS[0].data.first_name} ${USERS[0].data.last_name}`);
  expect(within(userBlock).getByText(USERS[0].data.phone)).toBeInTheDocument();

  const avatarImage = within(userBlock).getByRole("img");
  expect(avatarImage).toHaveAttribute("src", USERS[0].data.avatar);
});

test("DISALLOW transfer for UNKNOWN users", () => {});
