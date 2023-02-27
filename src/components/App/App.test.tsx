import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  test("Renders Button and it the counter works", async () => {
    const user = userEvent.setup();
    render(<App />);

    //  screen.getByRole("button", { name: /count is 0/i });

    await user.click(screen.getByRole("button", { name: /count is 0/i }));

    expect(
      screen.queryByRole("button", { name: /count is 0/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /count is 1/i })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /count is 1/i }));

    expect(
      screen.queryByRole("button", { name: /count is 1/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /count is 2/i })
    ).toBeInTheDocument();
  });
});
