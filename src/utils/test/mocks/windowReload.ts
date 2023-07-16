const { reload } = window.location;

beforeEach(() => {
  Object.defineProperty(window, "location", {
    writable: true,
    value: { reload: jest.fn() },
  });
});

afterEach(() => {
  window.location.reload = reload;
});
