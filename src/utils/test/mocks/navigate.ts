import * as router from "react-router";

const navigate = jest.fn();
let useNavigateSpy: jest.SpyInstance, useSearchParamsSpy: jest.SpyInstance;

beforeEach(() => {
  useNavigateSpy = jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

afterEach(() => {
  navigate.mockClear();
  useNavigateSpy.mockRestore();
});

export { navigate };
