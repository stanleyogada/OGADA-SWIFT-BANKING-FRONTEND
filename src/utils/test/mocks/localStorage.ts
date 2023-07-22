const localStorageSetItem = jest.fn();
const localStorageRemoveItem = jest.fn();

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      setItem: (key: string, value: string) => localStorageSetItem(key, value),
      removeItem: (key: string) => localStorageRemoveItem(key),
    },
  });
});

afterEach(() => {
  localStorageSetItem.mockClear();
  localStorageRemoveItem.mockClear();
});

export { localStorageSetItem, localStorageRemoveItem };
