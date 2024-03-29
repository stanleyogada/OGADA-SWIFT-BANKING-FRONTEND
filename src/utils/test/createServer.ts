import { rest } from "msw";
import { setupServer } from "msw/node";

import { Optional } from "../../customTypes";

type THandlerConfigMethod = "get" | "post" | "put" | "delete" | "patch" | "head" | "options";
type TUrl = string;
type THandlerConfig = {
  method?: THandlerConfigMethod;
  url: TUrl;
  res?: (req: any, res: any, ctx: any) => object;
};

const RESPONSE_DELAY = 100;

const createServer = (_handlerConfigs: (THandlerConfig | string)[]) => {
  let handlerConfigs = _handlerConfigs.map((config) => {
    if (typeof config === "string") {
      return {
        url: config,
      };
    }

    return config;
  }) as THandlerConfig[];

  handlerConfigs = [
    ...handlerConfigs,
    ...handlerConfigs.map((config) => ({
      method: "options" as THandlerConfigMethod,
      url: config.url,
      res: () => ({}),
    })),
  ] as THandlerConfig[];

  const handlers = handlerConfigs.map((config) =>
    rest[config.method || "get"](config.url, (req, res, ctx) => {
      return res(
        // Add a DELAY to the response to simulate network latency,
        // Otherwise we can't test loading states
        ctx.delay(RESPONSE_DELAY),
        ctx.json(config.res?.(req, res, ctx) || {})
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
          ctx.delay(RESPONSE_DELAY),
          ctx.status(handlerConfig.statusCode || 500),
          ctx.json(
            handlerConfig.res?.(req, res, ctx) || {
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

export type { THandlerConfig };
