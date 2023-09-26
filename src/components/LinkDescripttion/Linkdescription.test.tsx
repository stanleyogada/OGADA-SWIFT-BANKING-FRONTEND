import { screen, render, cleanup } from "@testing-library/react";

import TestProviders from "@components/TestProviders";

import LinkDescription from ".";

const renderComponent = (to?: string) =>
  render(
    <TestProviders>
      <LinkDescription text="This page is blank" to={to} />
    </TestProviders>
  );

test("Renders as expected", async () => {
  renderComponent();

  expect(screen.getByTestId("content")).toHaveTextContent("This page is blank");
  let proceedBtn = screen.getByTestId("proceedBtn");

  expect(proceedBtn).toBeDisabled();

  cleanup();

  renderComponent("/auth");

  expect(screen.getByTestId("content")).toHaveTextContent("This page is blank");
  proceedBtn = screen.getByTestId("proceedBtn");
  expect(proceedBtn).not.toBeDisabled();
  expect(screen.getByTestId("content")).toHaveTextContent("This page is blank");
});
