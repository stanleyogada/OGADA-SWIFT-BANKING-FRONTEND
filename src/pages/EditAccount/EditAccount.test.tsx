import { screen, render } from "@testing-library/react";
import EditAccount from ".";
import TestProviders from "@components/TestProviders";
import createServer from "@utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "@constants/services";
import userEvent from "@testing-library/user-event";

const NICKNAME = "code knight";
const EMAIl = "test@gmail.com";

createServer([
  {
    url: `${BASE_URL}${ENDPOINTS.currentUser}`,
    res: () => {
      return {
        data: {
          id: 4,
          created_at: "2023-06-21T17:05:11.518Z",
          updated_at: "2023-06-21T17:05:11.518Z",
          first_name: "Faker",
          last_name: "Me",
          middle_name: "tester",
          nickname: "tester",
          email: "test2@gmail.com",
          email_is_verified: false,
          phone: "1234567890",
          fullName: "Faker Me",
        },
      };
    },
  },

  {
    url: `${BASE_URL}${ENDPOINTS.updateUser}`,
    res: () => {
      return {
        status: "success",
        message: "User updated successfully!",
      };
    },
  },
]);

describe("porpulate input on load", () => {
  test("Updates a user's nickname and email", async () => {
    render(<EditAccount />, {
      wrapper: TestProviders,
    });

    const content = await screen.findByTestId("content");
    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const middleNameInput = screen.getByPlaceholderText(/middle name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const fullNameInput = screen.getByPlaceholderText(/full name/i);
    const phoneNumber = screen.getByPlaceholderText(/phone number/i);
    const nickNameInput = screen.getByPlaceholderText(/nickname/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const opayAccountNumber = screen.getByPlaceholderText(/account number/i);

    expect(firstNameInput).toHaveValue("Faker");
    expect(middleNameInput).toHaveValue("tester");
    expect(lastNameInput).toHaveValue("Me");
    expect(fullNameInput).toHaveValue("Faker Me");
    expect(phoneNumber).toHaveValue("1234567890");

    expect(opayAccountNumber).toHaveValue("1234567890");

    const disabledInput = [
      firstNameInput,
      middleNameInput,
      lastNameInput,
      fullNameInput,
      phoneNumber,
      opayAccountNumber,
    ];

    disabledInput.forEach((input) => {
      expect(input).toBeDisabled();
    });

    expect(nickNameInput).not.toBeDisabled();
    expect(emailInput).not.toBeDisabled();

    const user = userEvent.setup();
    await user.type(nickNameInput, NICKNAME);
    await user.type(emailInput, EMAIl);

    const saveButton = screen.getByRole("button", {
      name: /save/i,
    });
    userEvent.click(saveButton);
  });
});
