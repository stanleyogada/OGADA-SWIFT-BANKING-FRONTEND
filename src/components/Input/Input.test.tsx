import { cleanup, render, screen } from "@testing-library/react";

import Input from ".";
import { COLORS } from "../../constants";

test("Displays error message when error is passed", () => {
  render(<Input error="This is an error" />);

  const errorMessage = screen.getByText(/This is an error/i);
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveStyle("color: " + COLORS.pink);

  cleanup();

  render(<Input />);

  const errorMessage2 = screen.queryByText(/This is an error/i);
  expect(errorMessage2).not.toBeInTheDocument();
});

test("Displays label when label is passed", () => {
  render(<Input label="This is a label" name="test-input" required />);

  const label = screen.getByText(/This is a label/i);
  const input = screen.getByRole("textbox", { name: /This is a label/i });
  const required = screen.getByTestId("required");

  expect(label).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(required).toBeInTheDocument();
  expect(required).toHaveStyle("color: " + COLORS.pink);

  cleanup();

  render(<Input required />);

  const label2 = screen.queryByText(/This is a label/i);
  const required2 = screen.queryByTestId("required");
  expect(label2).not.toBeInTheDocument();
  expect(required2).not.toBeInTheDocument();
});
