import { screen, waitForElementToBeRemoved } from "@testing-library/react";

const handleAssertLoadingAfterSubmitClick = async (signUpButton: HTMLElement) => {
  const getLoadingElement = () => screen.getByTestId("loading");
  expect(getLoadingElement()).toBeInTheDocument();

  expect(signUpButton).toBeDisabled();
  await waitForElementToBeRemoved(() => getLoadingElement());

  expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  expect(signUpButton).not.toBeDisabled();
};

export { handleAssertLoadingAfterSubmitClick };
