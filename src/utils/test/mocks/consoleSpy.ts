let consoleErrorSpy: jest.SpyInstance;
let consoleInfoSpy: jest.SpyInstance;

beforeEach(() => {
  consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
  consoleInfoSpy = jest.spyOn(console, "info").mockImplementation();
});

afterEach(() => {
  consoleErrorSpy.mockClear();
  consoleInfoSpy.mockClear();
});

export { consoleErrorSpy, consoleInfoSpy };
