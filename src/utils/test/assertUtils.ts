import { screen, waitForElementToBeRemoved } from "@testing-library/react";

const handleAssertLoadingAfterSubmitClick = async (signUpButton: HTMLElement) => {
  await waitForElementToBeRemoved(() => {
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(signUpButton).toBeDisabled();

    return screen.getByTestId("loading");
  });

  expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  expect(signUpButton).not.toBeDisabled();
};

export { handleAssertLoadingAfterSubmitClick };
