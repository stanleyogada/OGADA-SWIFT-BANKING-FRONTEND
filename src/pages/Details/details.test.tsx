import { screen, render } from "@testing-library/react";
import Details from ".";
import { useParams, MemoryRouter, Route, Routes } from "react-router-dom";
import * as Router from "react-router-dom";
import TestProviders from "@components/TestProviders";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => ({ id: 2 })),
}));

test("renders Details", () => {
  render(
    <MemoryRouter initialEntries={["/details/1"]}>
      <Details />
    </MemoryRouter>
  );

  const Heading = screen.getByRole("heading", { name: /2/i });
  expect(Heading).toBeInTheDocument();
});
