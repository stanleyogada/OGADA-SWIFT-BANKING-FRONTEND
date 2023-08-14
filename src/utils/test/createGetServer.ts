import { rest } from "msw";
import { setupServer } from "msw/node";

type TPage = {
  data: {
    is_success: boolean;
    createdAt: string;
    T_id: number;
    type: string;
    amount: number;
    is_deposit: boolean;
  }[];
};

type TConfig = {
  url?: string;
  status: number;
  resBody: () => {
    pages: TPage[];
  };
};

const createGetServer = (reqConfigs: TConfig[]) => {
  let restReqConfigs = reqConfigs.map((config) => {
    return rest.get(config.url as string, (req, res, ctx) => {
      const pageParam = req.url.searchParams.get("_page");
      const _limit = 2;
      let startIndex = pageParam ? Number(pageParam) * _limit : 0;
      let startIndexInData = startIndex * _limit;
      let endIndexInData = startIndexInData + _limit;

      console.log(pageParam);
      let store = config.resBody().pages[0].data.slice(startIndexInData, endIndexInData);

      // console.log(config.resBody());

      return res(ctx.status(200), ctx.json(store));
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
      return rest.get("http://localhost:8000/trans", (req, res, ctx) => {
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
