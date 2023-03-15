import { screen, render } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  test("Renders Button with text and icon", async () => {
    render(<Button icon>Airtime</Button>);

    screen.getByRole("button", { name: /airtime/i });
  });
});
