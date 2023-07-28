import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PageNavHeader from "./pageNavHeader";
import { navigate } from "../../utils/test/mocks/navigate";

const renderComponent = () => {
  render(<PageNavHeader heading="name" backgroundColor="red" />);
};

describe("render pageNavHeader correctly", () => {
  test("should display the header correctly", () => {
    renderComponent();
    const headingElement = screen.getByRole("heading");
    const arrowElement = screen.getByTitle("left-caret");

    expect(arrowElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
  });

  test("should Have the padding styles provided correctly", () => {
    renderComponent();
    const divElement = screen.getByTitle("left-caret");

    expect(divElement.parentNode).toHaveStyle("padding: 50px 0px 15px 29px");
  });

  test("should Go back to previous page on click on the left-caret icon", async () => {
    const user = userEvent.setup();

    renderComponent();
    const iconElement = screen.getByTestId("icon");
    await user.click(iconElement);
    expect(navigate).toHaveBeenCalled();
  });
});
