const localStorageGetItem = jest.fn();
const localStorageSetItem = jest.fn();
const localStorageRemoveItem = jest.fn();

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: (key: string) => localStorageGetItem(key),
      setItem: (key: string, value: string) => localStorageSetItem(key, value),
      removeItem: (key: string) => localStorageRemoveItem(key),
    },
  });
});

afterEach(() => {
  localStorageGetItem.mockClear();
  localStorageSetItem.mockClear();
  localStorageRemoveItem.mockClear();
});

export { localStorageGetItem, localStorageSetItem, localStorageRemoveItem };
