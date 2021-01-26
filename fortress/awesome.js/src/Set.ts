import { _equal } from "./_utils";

function* createSetIterator(values: unknown[]) {
  for (let i = 0, len = values.length; i < len; i += 1) {
    yield values[i]
  }
}

function* createSetEntriesIterator(values: unknown[]) {
  for (let i = 0, len = values.length; i < len; i += 1) {
    const value = values[i]
    yield [value, value]
  }
}



export default class Set_ {

  #values: unknown[] = [];

  get size(): number {
    return this.#values.length;
  }

  constructor(source: unknown) {
    if (!(source as any)[Symbol.iterator]) {
      throw Error('')
    }

  }

  private indexOf(value: unknown) {
    const values = this.#values;
    for (let i = 0, len = values.length; i < len; i += 1) {
      if (_equal(value, values[i])) {
        return i;
      }
    }
    return -1;
  }

  add(value: unknown): Set_ {
    if (!this.has(value)) {
      this.#values.push(value)
    }

    return this;
  }

  delete(value: unknown): boolean {
    const index = this.indexOf(value);
    if (index > -1) {
      this.#values.splice(index, 1);
      return true;
    }
    return false;
  }

  has(value: unknown): boolean {
    return this.#values.includes(value)
  }

  clear(): void {
    this.#values = []
  }

  keys() {
    return this[Symbol.iterator]()
  }

  values() {
    return this[Symbol.iterator]()
  }

  entries() {
    return createSetEntriesIterator(this.#values)
  }

  forEach(callback: (value: unknown, key: unknown, map: Set_) => void) {
    this.#values.forEach((value) => callback(value, value, this));
  }

  [Symbol.iterator]() {
    return createSetIterator(this.#values)
  }
}