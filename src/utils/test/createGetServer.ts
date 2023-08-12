import { rest } from "msw";
import { setupServer } from "msw/node";

type TConfig = {
  url?: string;
  status: number;
  resBody: {
    pages: [
      {
        data: {
          is_success: boolean;
          createdAt: string;
          T_id: number;
          type: string;
        }[];
      }
    ];
  };
};

const createGetServer = (reqConfigs: TConfig[]) => {
  let restReqConfigs = reqConfigs.map((config) => {
    return rest.get(config.url as string, (req, res, ctx) => {
      const _limit = req.url.searchParams.get("_limit");
      const _page = req.url.searchParams.get("_page");
      console.log(_limit, _page);
      return res(ctx.status(config.status), ctx.json(config.resBody));
    });
  });

  const server = setupServer(...restReqConfigs);
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  const createGetErrorConfig = () => {
    let handlers = reqConfigs.map((config) => {
      return rest.get("http://localhost:8000", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            message: "an error has occured",
          })
        );
      });
    });

    server.use(...handlers);
  };

  return { createGetErrorConfig };
};

export default createGetServer;
