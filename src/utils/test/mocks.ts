const { reload } = window.location;

beforeAll(() => {
  Object.defineProperty(window, "location", {
    writable: true,
    value: { reload: jest.fn() },
  });
});

afterAll(() => {
  window.location.reload = reload;
});
