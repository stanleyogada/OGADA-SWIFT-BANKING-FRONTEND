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

test("`renderLeft` and `renderRight` props work correctly", () => {
  render(<Input renderLeft={() => <p>Left</p>} renderRight={() => <p>Right</p>} />);

  const left = screen.getByText(/Left/i);
  const right = screen.getByText(/Right/i);

  expect(left).toBeInTheDocument();
  expect(left.parentElement).toHaveClass("input__left");
  expect(right).toBeInTheDocument();
  expect(right.parentElement).toHaveClass("input__right");

  cleanup();

  render(<Input renderLeft={() => <p>Left</p>} />);
  const left2 = screen.getByText(/Left/i);
  const right2 = screen.queryByText(/Right/i);

  expect(left2).toBeInTheDocument();
  expect(right2).not.toBeInTheDocument();

  cleanup();

  render(<Input renderRight={() => <p>Right</p>} />);

  const left3 = screen.queryByText(/Left/i);
  const right3 = screen.getByText(/Right/i);

  expect(left3).not.toBeInTheDocument();
  expect(right3).toBeInTheDocument();
});
