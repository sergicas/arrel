import '@testing-library/jest-dom';

// Node 22+ ships a built-in localStorage that, without --localstorage-file,
// is an empty object without methods. It shadows jsdom's implementation, so
// we install a real in-memory store for tests.
const createMemoryStorage = () => {
  const store = new Map();
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => {
      store.set(key, String(value));
    },
    removeItem: (key) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
    key: (index) => Array.from(store.keys())[index] ?? null,
    get length() {
      return store.size;
    },
  };
};

Object.defineProperty(globalThis, 'localStorage', {
  value: createMemoryStorage(),
  configurable: true,
  writable: true,
});

Object.defineProperty(globalThis, 'sessionStorage', {
  value: createMemoryStorage(),
  configurable: true,
  writable: true,
});

Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  configurable: true,
  writable: true,
});
