import { screen, waitForElementToBeRemoved } from "@testing-library/react";

const handleAssertLoadingAfterSubmitClick = async (button: HTMLElement) => {
  await waitForElementToBeRemoved(() => {
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(button).toBeDisabled();

    return screen.getByTestId("loading");
  });

  expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  expect(button).not.toBeDisabled();
};

export { handleAssertLoadingAfterSubmitClick };
