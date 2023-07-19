const navigate = jest.fn() as jest.Mock;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigate,
}));

afterEach(() => {
  navigate.mockClear();
});
