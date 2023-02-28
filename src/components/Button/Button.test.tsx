import { screen, render } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  test("Renders Button and it the counter works", async () => {
    render(<Button>Test Button</Button>);

    screen.getByRole("button", { name: /test buttonz/i });
  });
});
