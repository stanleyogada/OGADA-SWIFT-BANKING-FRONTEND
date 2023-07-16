import { cleanup, render, screen } from "@testing-library/react";

import Input from ".";
import { COLORS } from "../../constants";

test("Displays error message when error is passed", () => {
  render(<Input error="This is an error" />);

  const errorMessage = screen.getByText(/This is an error/i);
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveClass("input__error");
  expect(errorMessage).toHaveStyle("color: " + COLORS.pink);

  cleanup();

  render(<Input />);

  const errorMessage2 = screen.queryByText(/This is an error/i);
  expect(errorMessage2).not.toBeInTheDocument();
});
