import { screen, waitForElementToBeRemoved } from "@testing-library/react";

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

export { handleAssertLoadingState };
