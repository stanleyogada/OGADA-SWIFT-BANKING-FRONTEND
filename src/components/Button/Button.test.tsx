import { screen, render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import icons from "@constants/icons";
import Button from ".";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useHref: () => jest.fn(),
}));

describe("Button", () => {
  test("Renders Button contents correctly", () => {
    render(
      <MemoryRouter>
        <Button>Test content</Button>
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /test content/i })).toBeInTheDocument();
    expect(screen.queryByTestId("btn-icon")).not.toBeInTheDocument();

    cleanup();

    render(
      <MemoryRouter>
        <Button icon={icons.phoneIcon()} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("btn-icon")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /test content/i })).not.toBeInTheDocument();

    cleanup();

    render(
      <MemoryRouter>
        <Button icon={icons.phoneIcon()} link="#">
          Test content
        </Button>
      </MemoryRouter>
    );

    expect(screen.getByTestId("btn-link")).toBeInTheDocument();
    expect(screen.getByTestId("btn-icon")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /test content/i })).toBeInTheDocument();
  });
});
