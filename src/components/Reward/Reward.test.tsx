import Reward from "./Reward";
import { render, screen } from "@testing-library/react";

describe("Reward", () => {
  test("should render text correctly", () => {
    render(<Reward />);
    const headingElement = screen.getByRole("heading", { name: "Buy Data" });
    expect(headingElement).toBeInTheDocument();
    const headingEl = screen.getByRole("heading", { name: "Buy Airtime" });
    expect(headingEl).toBeInTheDocument();
  });
});
