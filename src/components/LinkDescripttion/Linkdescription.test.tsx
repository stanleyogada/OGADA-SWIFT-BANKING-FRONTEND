import TestProviders from "@components/TestProviders";
import { screen, render } from "@testing-library/react";
import user_event from "@testing-library/user-event";
import { navigate } from "@utils/test/mocks/navigate";

import LinkDescription from ".";
const mockFunction = jest.fn();

test("Should render", async () => {
  render(
    <TestProviders>
      <LinkDescription removeModal={mockFunction} text="This page is blank" />
    </TestProviders>
  );

  expect(screen.getByTestId("content")).toHaveTextContent("This page is blank");
  const proceedBtn = screen.getByTestId("proceedBtn");

  expect(proceedBtn).toBeDisabled();
});

test("Should navigate", async () => {
  render(
    <TestProviders>
      <LinkDescription removeModal={mockFunction} to={"/auth"} text="This page is blank" />
    </TestProviders>
  );

  expect(screen.getByTestId("content")).toHaveTextContent("This page is blank");
  const proceedBtn = screen.getByTestId("proceedBtn");
  expect(proceedBtn).not.toBeDisabled();
  expect(screen.getByTestId("content")).toHaveTextContent("This page is blank");

  const user = user_event.setup();
});
