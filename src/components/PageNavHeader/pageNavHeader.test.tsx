import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PageNavHeader from "./pageNavHeader";
import { navigate } from "@utils/test/mocks/navigate";
import TestProviders from "@components/TestProviders";

const renderComponent = () => {
  render(<PageNavHeader heading="name" backgroundColor="red" />, {
    wrapper: TestProviders,
  });
};

describe("render pageNavHeader correctly", () => {
  test("should display the header correctly", () => {
    renderComponent();
    const headingElement = screen.getByTestId("heading");
    const arrowElement = screen.getByTitle("left-caret");

    expect(arrowElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
  });

  test("should Have the background styles provided correctly", () => {
    renderComponent();
    const divElement = screen.getByTitle("left-caret");

    expect(divElement.parentNode).toHaveStyle({ backgroundColor: "red" });
  });

  test("should Go back to previous page on click on the left-caret icon", async () => {
    const user = userEvent.setup();

    renderComponent();

    const iconElement = screen.getByTestId("icon");
    await user.click(iconElement);

    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
