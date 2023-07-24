const { reload } = window.location;
const _alert = window.alert;

beforeEach(() => {
  Object.defineProperty(window, "location", {
    writable: true,
    value: { reload: jest.fn() },
  });

  window.alert = jest.fn();
});

afterEach(() => {
  window.location.reload = reload;
  window.alert = _alert;
});
