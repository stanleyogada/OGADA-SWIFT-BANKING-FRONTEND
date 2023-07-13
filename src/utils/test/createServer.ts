import { rest } from "msw";
import { setupServer } from "msw/node";

type HandlerConfig = {
  method: "get" | "post" | "put" | "delete";
  path: string;
  res: (req: any, res: any, ctx: any) => Object;
};

const createServer = (handlerConfig: HandlerConfig[]) => {
  const handlers = handlerConfig.map((config) =>
    rest[config.method || "get"](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    })
  );

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};

export default createServer;
