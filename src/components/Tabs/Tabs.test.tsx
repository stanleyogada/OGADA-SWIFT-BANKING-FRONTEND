import { render, screen } from "@testing-library/react";
import Tabs from "./Tabs";

describe("Tabs", () => {
  test("Workings!", () => {
    render(<Tabs />);

    screen.getByText(/tabs/i);
  });
});
