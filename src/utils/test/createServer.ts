import { rest } from "msw";
import { setupServer } from "msw/node";

import { Optional } from "../../types";

type THandlerConfigMethod = "get" | "post" | "put" | "delete" | "patch" | "head" | "options";
type THandlerConfig = {
  method?: THandlerConfigMethod;
  url: string;
  res: (req: any, res: any, ctx: any) => object;
};

const createServer = (handlerConfigs: THandlerConfig[]) => {
  handlerConfigs = [
    ...handlerConfigs,
    ...handlerConfigs.map((config) => ({
      method: "options" as THandlerConfigMethod,
      url: config.url,
      res: () => ({}),
    })),
  ];

  console.log(handlerConfigs);

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

  const handleCreateErrorConfig = (handlerConfig: Optional<THandlerConfig, "res"> & { statusCode?: number }) => {
    server.use(
      rest[handlerConfig.method || "get"](handlerConfig.url, (req, res, ctx) => {
        return res(
          // Add a DELAY to the response to simulate network latency,
          // Otherwise we can't test loading states
          ctx.delay(1),
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
