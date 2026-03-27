export async function register() {
  // Node.js 22+ provides a global `localStorage` object, but without
  // `--localstorage-file` the methods (getItem, setItem, etc.) are undefined,
  // causing "localStorage.getItem is not a function" during SSR.
  // Patch it with an in-memory implementation so server rendering doesn't crash.
  if (
    typeof globalThis.localStorage !== 'undefined' &&
    typeof globalThis.localStorage.getItem !== 'function'
  ) {
    const memoryStorage = new Map();
    globalThis.localStorage = {
      getItem: key => memoryStorage.get(String(key)) ?? null,
      setItem: (key, value) => memoryStorage.set(String(key), String(value)),
      removeItem: key => memoryStorage.delete(String(key)),
      clear: () => memoryStorage.clear(),
      key: index => Array.from(memoryStorage.keys())[index] ?? null,
      get length() {
        return memoryStorage.size;
      },
    };
  }

  // Same patch for sessionStorage
  if (
    typeof globalThis.sessionStorage !== 'undefined' &&
    typeof globalThis.sessionStorage.getItem !== 'function'
  ) {
    const memorySession = new Map();
    globalThis.sessionStorage = {
      getItem: key => memorySession.get(String(key)) ?? null,
      setItem: (key, value) => memorySession.set(String(key), String(value)),
      removeItem: key => memorySession.delete(String(key)),
      clear: () => memorySession.clear(),
      key: index => Array.from(memorySession.keys())[index] ?? null,
      get length() {
        return memorySession.size;
      },
    };
  }
}
