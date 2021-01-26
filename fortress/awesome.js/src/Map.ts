import { _equal } from "./_utils";

function* createMapIterator(values: [unknown, unknown][]) {
  for (let i = 0, len = values.length; i < len; i += 1) {
    yield values[i]
  }
}

function* createMapKeyIterator(values: [unknown, unknown][]) {
  for (let i = 0, len = values.length; i < len; i += 1) {
    yield values[i][0]
  }
}

function* createMapValueIterator(values: [unknown, unknown][]) {
  for (let i = 0, len = values.length; i < len; i += 1) {
    yield values[i][1]
  }
}

export default class Map_ {
  #values: [unknown, unknown][] = [];

  get size() {
    return this.#values.length;
  }

  constructor(source: [unknown, unknown][] = []) {
    this.#values = source;
  }

  set(key: unknown, value: unknown) {
    if (this.has(key)) {
      // 已存在 key，修改
      this.#values = this.#values.map(([_key, _value]) => {
        if (_equal(_key, key)) {
          return [key, value];
        }
        return [_key, _value];
      });
      return;
    }
    // 添加
    this.#values.push([key, value]);
  }

  get(key: unknown) {
    const values = this.#values;

    for (let i = 0, len = values.length; i < len; i += 1) {
      const value = values[i];
      if (_equal(key, value[0])) {
        return value[1];
      }
    }

    return undefined;
  }

  delete(key: unknown) {
    const result = this.#values.filter(([_key]) => !_equal(key, _key));

    if (result.length === this.#values.length) {
      // 未删除
      return false;
    }

    this.#values = result;
    return true;
  }

  has(key: unknown): boolean {
    return this.#values.some(([_key]) => _equal(key, _key));
  }

  clear() {
    this.#values = [];
  }


  forEach(callback: (value: unknown, key: unknown, map: Map_) => void) {
    this.#values.forEach(([key, value]) => callback(value, key, this));
  }

  // 返回遍历器对象
  keys() {
    return createMapKeyIterator(this.#values)
  }

  values() {
    return createMapValueIterator(this.#values)
  }

  entries() {
    return this[Symbol.iterator]()
  }

  [Symbol.iterator]() {
    return createMapIterator(this.#values)
  }
}
