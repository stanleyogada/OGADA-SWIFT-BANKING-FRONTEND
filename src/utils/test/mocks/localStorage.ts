const localStorageSetItem = jest.fn();

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      setItem: (key: string, value: string) => localStorageSetItem(key, value),
    },
  });
});

afterEach(() => {
  localStorageSetItem.mockClear();
});

export { localStorageSetItem };
