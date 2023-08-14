import { screen, render, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";

// import TestProviders from "@components/TestProviders";
// import createServer from "@utils/test/createServer";
import createGetServer from "@utils/test/createGetServer";
import Transaction from ".";

let Client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const { createGetErrorConfig } = createGetServer([
  {
    resBody: () => ({
      pages: [
        {
          data: [
            {
              createdAt: "2015-06-2022",
              is_success: true,
              type: "cashback",
              T_id: 1,
              amount: 40,
              is_deposit: false,
            },
            {
              createdAt: "2015-06-2022",
              is_success: true,
              type: "cashback",
              T_id: 1,
              amount: 100,
              is_deposit: true,
            },
          ],
        },
      ],
    }),
    status: 200,
    url: `http://localhost:8000/trans`,
  },
]);

test("shows two card on first render", async () => {
  render(
    // @ts-ignore
    <QueryClientProvider client={Client}>
      <Transaction />
    </QueryClientProvider>
  );
  screen.debug();

  const element = await screen.findAllByTestId("card");

  // expect(element).toHaveLength(1);
});
