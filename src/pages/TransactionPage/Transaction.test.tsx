import { screen, render, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
import Transaction from ".";
// import TestProviders from "@components/TestProviders";
// import createServer from "@utils/test/createServer";
import createGetServer from "@utils/test/createGetServer";

let Client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const { createGetErrorConfig } = createGetServer([
  {
    resBody: {
      pages: [
        {
          data: [
            {
              createdAt: "2015-06-2022",
              is_success: true,
              type: "cashback",
              T_id: 1,
            },
            {
              createdAt: "2015-06-2022",
              is_success: true,
              type: "cashback",
              T_id: 1,
            },
          ],
        },
      ],
    },
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

  await pause();
  screen.debug();
});

const pause = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
