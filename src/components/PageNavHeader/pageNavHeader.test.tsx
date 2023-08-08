import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PageNavHeader from "./pageNavHeader";
import { navigate } from "../../utils/test/mocks/navigate";
import TestProviders from "@components/TestProviders";

const renderComponent = (
  props = {
    heading: "name",
    backgroundColor: "red",
  }
) => {
  render(<PageNavHeader {...props} />, {
    wrapper: TestProviders,
  });
};

test("Props are passed are wired up correctly", () => {
  renderComponent({
    heading: "name",
    backgroundColor: "red",
  });
  let headingElement = screen.getByRole("heading", { name: /name/i });

  expect(headingElement).toBeInTheDocument();
  expect(headingElement.parentElement).toHaveStyle({ backgroundColor: "red" });

  cleanup();

  renderComponent({
    heading: "Account",
    backgroundColor: "blue",
  });
  headingElement = screen.getByRole("heading", { name: /account/i });

  expect(headingElement).toBeInTheDocument();
  expect(headingElement.parentElement).toHaveStyle({ backgroundColor: "blue" });
});

test("should Go back to previous page on click on the left-caret icon", async () => {
  const user = userEvent.setup();
  renderComponent();

  const button = screen.getByRole("button");

  expect(navigate).not.toHaveBeenCalled();
  await user.click(button);
  expect(navigate).toHaveBeenCalledWith(-1);
});
