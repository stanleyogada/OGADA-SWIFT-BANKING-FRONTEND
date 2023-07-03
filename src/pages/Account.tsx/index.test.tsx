import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Account from ".";

describe("Account", () => {
  test("component should render with correct height", async () => {
    user.setup();
    render(<Account />);

    const infoSection = await screen.getByRole("info-section");
    expect(infoSection).toHaveStyle("height: 128px");

    const toggleButton = screen.getByRole("toggle");
    await user.click(toggleButton);

    expect(infoSection).toHaveStyle("height: 200px");
  });
});
