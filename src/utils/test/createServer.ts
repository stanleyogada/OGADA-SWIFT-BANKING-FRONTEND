import { rest } from "msw";
import { setupServer } from "msw/node";
import { Optional } from "../../types";

type HandlerConfig = {
  method?: "get" | "post" | "put" | "delete";
  url: string;
  res: (req: any, res: any, ctx: any) => Object;
};

const createServer = (handlerConfigs: HandlerConfig[]) => {
  const handlers = handlerConfigs.map((config) =>
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

  const handleCreateErrorConfig = (handlerConfig: Optional<HandlerConfig, "res"> & { statusCode?: number }) => {
    server.use(
      rest[handlerConfig.method || "get"](handlerConfig.url, (req, res, ctx) => {
        return res(
          ctx.status(handlerConfig.statusCode || 500),
          ctx.json(
            handlerConfig.res
              ? handlerConfig.res(req, res, ctx)
              : {
                  message: "Internal Server Error",
                }
          )
        );
      })
    );
  };

  return {
    handleCreateErrorConfig,
  };
};

export default createServer;
