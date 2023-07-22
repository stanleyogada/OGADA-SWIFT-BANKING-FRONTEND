import * as router from "react-router";

const navigate = jest.fn();
let useNavigateSpy: jest.SpyInstance;

beforeEach(() => {
  useNavigateSpy = jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

afterEach(() => {
  useNavigateSpy.mockRestore();
});

export { navigate };
