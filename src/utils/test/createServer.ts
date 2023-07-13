import { rest } from "msw";
import { setupServer } from "msw/node";

type HandlerConfig = {
  method?: "get" | "post" | "put" | "delete";
  url: string;
  res: (req: any, res: any, ctx: any) => Object;
};

const createServer = (handlerConfig: HandlerConfig[]) => {
  const handlers = handlerConfig.map((config) =>
    rest[config.method || "get"](config.url, (req, res, ctx) => {
      return res(
        // Add a DELAY to the response to simulate network latency,
        // Otherwise we can't test loading states
        ctx.delay(1),
        ctx.json(config.res(req, res, ctx))
      );
    })
  );

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};

export default createServer;
