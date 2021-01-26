// TODO: 也许在setItem中自动调用JSON.stringify不是一个好的实现

export default function storageApi(storage: Storage = {} as Storage) {
  /**
   * 设置storage{key,value} value可以是任意值。如果`typeof value !== 'string'`，
   * value将被通过`JSON.stringify`函数转换为`string`
   * */
  const setItem = (key: string, value: unknown) => {
    // stringify可能会报错，就直接抛出就行了
    storage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    );
  };

  const getItem = (key: string) => {
    const value = storage.getItem(key);
    try {
      return JSON.parse(value as string);
    } catch {
      return value;
    }
  };

  const removeItem = (key: string) => {
    storage.removeItem(key);
  };

  const createStorageManager = <T = string>(key: string) => {
    return {
      set: (value: T): void => setItem(key, value),
      get: (): T | string | null => getItem(key),
      remove: () => {
        removeItem(key);
      },
    };
  };

  const clear = () => {
    storage.clear();
  };

  const key = (index: number) => {
    return storage.key(index);
  };

  const getLength = () => {
    return storage.length;
  };

  return {
    clear,
    createStorageManager,
    setItem,
    getItem,
    key,
    removeItem,
    getLength,
  };
}
