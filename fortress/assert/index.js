module.exports = function assert(condition, logMsg) {
  if (condition) {
    // eslint-disable-next-line no-console
    console.log(logMsg);
  }
};
