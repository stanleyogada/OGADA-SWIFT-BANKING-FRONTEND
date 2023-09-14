import { screen, render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import Details from ".";
import { useParams, MemoryRouter, Route, Routes } from "react-router-dom";
import * as Router from "react-router-dom";
import TestProviders from "@components/TestProviders";
import createServer from "@utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "@constants/services";
import { CLIENT_ROUTES } from "@constants/routes";
import { navigate } from "@utils/test/mocks/navigate";
import { consoleInfoSpy } from "@utils/test/mocks/consoleSpy";
import { TEST_LOG_PREFIX } from "@constants/index";

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

test("renders transaction details correctly", async () => {
  render(
    <TestProviders>
      <Details />
    </TestProviders>
  );

  const params = screen.getByTestId("params");
  const details = await screen.findAllByTestId("details");
  expect(details).toHaveLength(4);
  expect(details[0]).toHaveTextContent(`${TRANSACTION_ID}`);
  expect(details[1]).toHaveTextContent("Saturday, Sep 2023");
  expect(params).toBeInTheDocument();
  expect(details[2]).toHaveTextContent("failed");
  expect(screen.getByText(/mood type/i)).toBeInTheDocument();
});

test("navigate to 404 Page when the there is an error", async () => {
  render(
    <TestProviders>
      <Details />
    </TestProviders>
  );

  handleCreateErrorConfig({
    url: `${BASE_URL}${CLIENT_ROUTES.allTransactions}/${TRANSACTION_TYPE}/${TRANSACTION_ID}`,

    statusCode: 404,
  });

  expect(consoleInfoSpy).not.toHaveBeenCalled();

  expect(await screen.findByTestId("error404")).toBeInTheDocument();

  expect(consoleInfoSpy).toHaveBeenCalledWith(TEST_LOG_PREFIX, "Navigate", "/404");
});
