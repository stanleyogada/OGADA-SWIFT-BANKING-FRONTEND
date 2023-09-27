import { cleanup, render, screen, waitFor, within } from "@testing-library/react";

import TestProviders from "@components/TestProviders";

import SendMoneyInHouse from ".";
import userEvent from "@testing-library/user-event";
import { handleAssertLoadingState } from "@utils/test/assertUtils";
import createServer from "@utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "@constants/services";

const PHONE = ["4286351832", "1234567890"];

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
      phone: PHONE[0],
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
      phone: PHONE[1],
      avatar: "https://i.pravatar.cc/150?u=1234567890",
    },
  },
];

let user: ReturnType<typeof userEvent.setup>;

beforeEach(() => (user = userEvent.setup()));

const { handleCreateErrorConfig } = createServer([
  {
    url: `${BASE_URL}${ENDPOINTS.getUserByPhone}/${PHONE[0]}`,
    res: () => {
      return {
        data: USERS[0].data,
      };
    },
  },
  {
    url: `${BASE_URL}${ENDPOINTS.getUserByPhone}/${PHONE[1]}`,
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

test("Allow transfer for known users", async () => {
  render(<SendMoneyInHouse />, {
    wrapper: TestProviders,
  });

  let phoneInput = screen.getByPlaceholderText(/phone/i);

  expect(screen.queryByTestId("user-block")).not.toBeInTheDocument();

  await user.type(phoneInput, PHONE[0].slice(0, -1));
  expect(screen.queryByTestId("user-block")).not.toBeInTheDocument();

  await user.type(phoneInput, PHONE[0].slice(-1));
  expect(phoneInput).toHaveValue(PHONE[0]);

  await handleAssertLoadingState("get-user-by-phone-loading");

  let userBlock = screen.getByTestId("user-block");
  let fullNameElement = within(userBlock).getByTestId("user-full-name");
  expect(fullNameElement).toHaveTextContent(`${USERS[0].data.first_name} ${USERS[0].data.last_name}`);
  expect(within(userBlock).getByText(USERS[0].data.phone)).toBeInTheDocument();

  let avatarImage = within(userBlock).getByRole("img");
  expect(avatarImage).toHaveAttribute("src", USERS[0].data.avatar);

  cleanup();

  render(<SendMoneyInHouse />, {
    wrapper: TestProviders,
  });

  const sendMoneyButton = screen.getByRole("button", { name: /send money/i });
  phoneInput = screen.getByPlaceholderText(/phone/i);

  expect(sendMoneyButton).toBeDisabled();

  await user.type(phoneInput, PHONE[1]);
  expect(phoneInput).toHaveValue(PHONE[1]);

  await handleAssertLoadingState("get-user-by-phone-loading");

  expect(sendMoneyButton).toBeEnabled();

  userBlock = screen.getByTestId("user-block");
  fullNameElement = within(userBlock).getByTestId("user-full-name");
  expect(fullNameElement).toHaveTextContent(`${USERS[1].data.first_name} ${USERS[1].data.last_name}`);
  expect(within(userBlock).getByText(USERS[1].data.phone)).toBeInTheDocument();

  avatarImage = within(userBlock).getByRole("img");
  expect(avatarImage).toHaveAttribute("src", USERS[1].data.avatar);

  const amountInput = screen.getByPlaceholderText(/amount/i);
  const noteInput = screen.getByPlaceholderText(/note/i);

  const amount = "1000";
  const remark = "Test remark";

  await user.type(amountInput, amount);
  await user.type(noteInput, remark);

  expect(amountInput).toHaveValue(amount);
  expect(noteInput).toHaveValue(remark);

  await user.click(sendMoneyButton);

  await handleAssertLoadingState(sendMoneyButton);

  // The real implementation has a setTimeout of 5ms before clearing the form
  await waitFor(() => {
    expect(phoneInput).toHaveValue("");
    expect(amountInput).toHaveValue("");
    expect(noteInput).toHaveValue("");

    expect(screen.queryByTestId("user-block")).not.toBeInTheDocument();
    expect(screen.getByTestId("send-money-success")).toBeInTheDocument();
  });
});

test("DISALLOW transfer for UNKNOWN users", async () => {
  handleCreateErrorConfig({
    url: `${BASE_URL}${ENDPOINTS.getUserByPhone}/${PHONE[0]}`,
    statusCode: 404,
  });

  render(<SendMoneyInHouse />, {
    wrapper: TestProviders,
  });

  const phoneInput = screen.getByPlaceholderText(/phone/i);
  const sendMoneyButton = screen.getByRole("button", { name: /send money/i });

  await user.type(phoneInput, PHONE[0]);

  expect(sendMoneyButton).toBeDisabled();

  await handleAssertLoadingState("get-user-by-phone-loading");

  expect(sendMoneyButton).toBeDisabled();
  expect(screen.queryByTestId("user-block")).not.toBeInTheDocument();

  expect(screen.getByTestId("get-user-by-phone-error")).toBeInTheDocument();
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

  const phoneInput = screen.getByPlaceholderText(/phone/i);
  const sendMoneyButton = screen.getByRole("button", { name: /send money/i });

  await user.type(phoneInput, PHONE[0]);

  expect(sendMoneyButton).toBeDisabled();

  await handleAssertLoadingState("get-user-by-phone-loading");

  expect(sendMoneyButton).toBeEnabled();
  expect(screen.getByTestId("user-block")).toBeInTheDocument();

  const amountInput = screen.getByPlaceholderText(/amount/i);
  const noteInput = screen.getByPlaceholderText(/note/i);

  const amount = "1000";
  const remark = "Test remark";

  await user.type(amountInput, amount);
  await user.type(noteInput, remark);

  expect(amountInput).toHaveValue(amount);
  expect(noteInput).toHaveValue(remark);

  await user.click(sendMoneyButton);

  await handleAssertLoadingState(sendMoneyButton);

  expect(screen.getByTestId("send-money-error")).toBeInTheDocument();
  expect(phoneInput).toHaveValue(PHONE[0]);
  expect(amountInput).toHaveValue(amount);
  expect(noteInput).toHaveValue(remark);

  await user.click(sendMoneyButton);

  await handleAssertLoadingState(sendMoneyButton);

  expect(screen.getByTestId("send-money-error")).toBeInTheDocument();
  expect(phoneInput).toHaveValue(PHONE[0]);
  expect(amountInput).toHaveValue(amount);
  expect(noteInput).toHaveValue(remark);
});
