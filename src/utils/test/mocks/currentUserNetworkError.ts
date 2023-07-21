let consoleErrorSpy: jest.SpyInstance;

beforeEach(() => {
  consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
});

afterEach(() => {
  consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
  let message = consoleErrorSpy.mock.calls[0];
  if (message && !`${message[0]}`.includes("origin http://localhost forbidden")) {
    console.log("ERROR: ", message.join(" "));
  }
});
