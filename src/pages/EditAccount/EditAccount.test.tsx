import { screen, render } from "@testing-library/react";
import EditAccount from ".";
import userEvent from "@testing-library/user-event";
import TestProviders from "@components/TestProviders";
import { renderHook } from "@testing-library/react";
import useCurrentUser from "@hooks/useCurrentUser";

const NICKNAME = "code knight";
const EMAIl = "test@gmail.com";

test("Updates a user's nickname and email", async () => {
  render(<EditAccount />, {
    wrapper: TestProviders,
  });

  const firstNameInput = screen.getByPlaceholderText(/first name/i);

  const middleNameInput = screen.getByPlaceholderText(/middle name/i);
  const lastNameInput = screen.getByPlaceholderText(/last name/i);
  const fullName = screen.getByPlaceholderText(/full name/i);
  const phoneNumber = screen.getByPlaceholderText(/phone number/i);
  const nickNameInput = screen.getByPlaceholderText(/nickname/i);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const opayAccountNumber = screen.getByPlaceholderText(/account number/i);

  const disabledInput = [firstNameInput, middleNameInput, lastNameInput, fullName, phoneNumber, opayAccountNumber];

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
