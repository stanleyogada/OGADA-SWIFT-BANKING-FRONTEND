let consoleErrorSpy: jest.SpyInstance;

beforeEach(() => {
  consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
});

afterEach(() => {
  consoleErrorSpy.mockClear();
});
