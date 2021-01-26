/* eslint-disable no-param-reassign */
import isStrictObject from '../../../share/isStrictObject';

// FIXME: TS
const combineOptionsForTwoObject = <T extends { [key: string]: any }>(
  source: T,
  obj: T
): T => {
  Object.entries(obj).forEach(([key, value]) => {
    if (!source[key]) {
      (source as any)[key] = value;
      return;
    }

    if (!isStrictObject(value)) {
      (source as any)[key] = value;
      return;
    }

    (source as any)[key] = combineOptionsForTwoObject(source[key], value);
  });

  return source;
};

export default function combineOptions<T extends { [key: string]: any }>(
  source: T,
  ...objs: T[]
): T {
  return objs.reduce(
    (_source, obj) => combineOptionsForTwoObject(_source, obj),
    source
  );
}
