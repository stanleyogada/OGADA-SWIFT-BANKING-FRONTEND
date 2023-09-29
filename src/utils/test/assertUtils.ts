import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function handleAssertLoadingState(button: HTMLElement): Promise<void>;
function handleAssertLoadingState(loadingElementDataTestId: string): Promise<void>;

async function handleAssertLoadingState(x: unknown) {
  const getLoadingElement = (isQueryBy?: boolean) => {
    if (typeof x === "object") {
      return screen[isQueryBy ? "queryByTestId" : "getByTestId"]("loading");
    }

    return screen[isQueryBy ? "queryByTestId" : "getByTestId"](x as string);
  };

  await waitForElementToBeRemoved(() => {
    expect(getLoadingElement()).toBeInTheDocument();

    if (typeof x === "object") {
      expect(x).toBeDisabled();
    }

    return getLoadingElement();
  });

  expect(getLoadingElement(true)).not.toBeInTheDocument();

  if (typeof x === "object") {
    expect(x).not.toBeDisabled();
  }
}

const handleTypeAmountRemarkAndSendMoney = async (amount: string = "1000", remark: string = "Test remark") => {
  const user = userEvent.setup();

  const sendMoneyButton = screen.getByRole("button", { name: /send money/i });

  const amountInput = screen.getByPlaceholderText(/amount/i);
  const noteInput = screen.getByPlaceholderText(/note/i);

  await user.type(amountInput, amount);
  await user.type(noteInput, remark);

  expect(amountInput).toHaveValue(amount);
  expect(noteInput).toHaveValue(remark);

  await user.click(sendMoneyButton);

  await handleAssertLoadingState(sendMoneyButton);

  return {
    amountInput,
    noteInput,
  };
};

export { handleAssertLoadingState, handleTypeAmountRemarkAndSendMoney };
