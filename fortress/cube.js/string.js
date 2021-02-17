/**
 * 驼峰字符串转中划线分隔形式
 */
const hyphenateRE = /\B([A-Z])/g;
exports.hyphenate = (str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
};

/**
 * 字符串首字母大写
 */
exports.capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 中划线分隔字符串转驼峰
 */
const camelizeRE = /-(\w)/g;
exports.camelize = (str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
};
