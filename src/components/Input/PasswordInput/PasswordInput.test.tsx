import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PasswordInput from ".";

test("Displays password input", async () => {
  const user = userEvent.setup();
  render(<PasswordInput placeholder="Enter 6 digits login passcode" />);

  const eyeIcon = screen.getByTestId("eye-icon");
  expect(eyeIcon).toBeInTheDocument();

  expect(screen.getByPlaceholderText(/enter 6 digits login passcode/i)).toHaveAttribute("type", "password");

  await user.click(eyeIcon);
  expect(screen.getByPlaceholderText(/enter 6 digits login passcode/i)).toHaveAttribute("type", "text");

  await user.click(eyeIcon);
  expect(screen.getByPlaceholderText(/enter 6 digits login passcode/i)).toHaveAttribute("type", "password");
});
