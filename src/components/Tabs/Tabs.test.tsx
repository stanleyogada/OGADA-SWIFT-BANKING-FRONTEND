import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "./Tabs";

const user = userEvent.setup();

beforeEach(() => {
  render(
    <Tabs
      data={[
        {
          id: "tab-1",
          heading: "Tab 1",
        },
        {
          id: "tab-2",
          heading: "Tab 2",
        },
      ]}
    >
      <div>Pane 1</div>
      <div>Pane 2</div>
    </Tabs>
  );
});

describe("Tabs", () => {
  test("renders props correctly", () => {
    screen.getByText(/tab 1/i);
    screen.getByText(/tab 2/i);
    screen.getByText(/pane 1/i);
    expect(screen.queryByText(/pane 2/i)).not.toBeInTheDocument();
  });

  test("renders one pane at a time", async () => {
    screen.getByText(/pane 1/i);
    expect(screen.queryByText(/pane 2/i)).not.toBeInTheDocument();

    const tab1Control = screen.getByText(/tab 1/i);
    const tab2Control = screen.getByText(/tab 2/i);

    await user.click(tab2Control);
    screen.getByText(/pane 2/i);
    expect(screen.queryByText(/pane 1/i)).not.toBeInTheDocument();

    await user.click(tab1Control);
    screen.getByText(/pane 1/i);
    expect(screen.queryByText(/pane 2/i)).not.toBeInTheDocument();
  });
});
