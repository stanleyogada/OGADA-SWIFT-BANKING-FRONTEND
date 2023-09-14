import { screen, render } from "@testing-library/react";
import Details from ".";
import { useParams, MemoryRouter, Route, Routes } from "react-router-dom";
import * as Router from "react-router-dom";
import TestProviders from "@components/TestProviders";
import createServer from "@utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "@constants/services";
import { CLIENT_ROUTES } from "@constants/routes";

const TRANSACTION_TYPE = "banks";
const TRANSACTION_ID = 2;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => ({ type: TRANSACTION_TYPE, id: TRANSACTION_ID })),
}));

const { handleCreateErrorConfig } = createServer([
  {
    url: `${BASE_URL}${CLIENT_ROUTES.allTransactions}/${TRANSACTION_TYPE}/${TRANSACTION_ID}`,
    res() {
      return {
        data: {
          transaction_id: TRANSACTION_ID,
          created_at: "2023-09-02T22:01:46.821Z",
          is_success: false,
          mood_type: "happy",
        },
      };
    },
  },
  `${BASE_URL}${ENDPOINTS.currentUser}`,
]);

test("renders Details", async () => {
  render(
    <TestProviders>
      <Details />
    </TestProviders>
  );

  // const Heading = screen.getByTestId("params");
  const details = await screen.findAllByTestId("details");
  details.forEach((d) => screen.debug(d));
  // expect(details).toHaveLength(6);
  // expect(Heading).toBeInTheDocument();
});
