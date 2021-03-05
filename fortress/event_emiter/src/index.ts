export default class On {
  callbackMap: { [key: string]: ((...args: unknown[]) => void)[] };

  constructor() {
    this.callbackMap = {};
  }

  on(msg: string, callback: (...args: unknown[]) => void) {
    const { callbackMap } = this;

    (callbackMap[msg] || (callbackMap[msg] = [])).push(callback);
  }

  emit(msg: string, ...params: unknown[]) {
    const callbacks = this.callbackMap[msg];

    if (!callbacks) {
      return;
    }

    // eslint-disable-next-line prefer-spread
    callbacks.forEach((callback) => callback.apply(undefined, params));
  }
}
