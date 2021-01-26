
/**
 * 相等比较函数
 * 
 * _equal(NaN, NaN) === true;
 * _equal(-0, 0) === true;
 * 
 */
export const _equal = (value1: unknown, value2: unknown) => {
  // -0 === 0
  // Object.is(-0, 0) === false;
  if (value1 === value2) {
    return true;
  }
  // NaN
  return (value1 !== value1 && value2 !== value2);
}