import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TestProviders from "@components/TestProviders";

import TransferPinModal, { NUMBER_LIST } from ".";

test("Ensure component has a screen and buttons and completes without errors", async () => {
  const onComplete = jest.fn();

  render(<TransferPinModal onComplete={onComplete} cb={jest.fn()} />, {
    wrapper: TestProviders,
  });
  const user = userEvent.setup();

  const pinScreen = screen.getByTestId("pin-screen");

  for (const number of NUMBER_LIST) {
    const button = screen.getByRole("button", { name: number.toString() });
    expect(button).toBeInTheDocument();

    if (number > 3) continue;

    await user.click(button);
    expect(pinScreen).toHaveTextContent(number.toString());

    if (number === 3) {
      expect(onComplete).toHaveBeenCalledWith("0123");
    } else {
      expect(onComplete).not.toHaveBeenCalled();
    }
  }

  const buttonOne = screen.getByRole("button", { name: "1" });
  const buttonTwo = screen.getByRole("button", { name: "2" });
  const buttonThree = screen.getByRole("button", { name: "3" });
  const deleteButton = screen.getByRole("button", { name: /delete/i });
  const clearButton = screen.getByRole("button", { name: /clear/i });

  await user.click(buttonOne);
  await user.click(buttonTwo);
  await user.click(buttonThree);

  expect(pinScreen).toHaveTextContent("123");

  await user.click(deleteButton);
  expect(pinScreen).toHaveTextContent("12");

  await user.click(clearButton);
  expect(pinScreen).toHaveTextContent("");
});
