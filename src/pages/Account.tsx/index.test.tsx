import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Account from ".";

describe("Account", () => {
  test("should render account component properly", () => {
    render(<Account />);

    const account = screen.getByRole("account-section");
    expect(account).toBeInTheDocument();
  });

  test("component should render with correct height", async () => {
    user.setup();
    render(<Account />);

    const wrapper = await screen.getByRole("info-section");
    expect(wrapper).toHaveStyle("height: 128px");

    const Toggle = screen.getByRole("toggle");
    await user.click(Toggle);

    expect(wrapper).toHaveStyle("height: 200px");
  });

  //
});
