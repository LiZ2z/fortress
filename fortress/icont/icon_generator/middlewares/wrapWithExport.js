/* eslint-disable func-names */
const through2 = require('through2');

const wrapWithExport = (str) => {
  return `export default \`${str}\`;`;
};

module.exports = function useWrapWithExport() {
  return through2.obj(function (chunk, enc, callback) {
    chunk.contents = Buffer.from(wrapWithExport(chunk.contents.toString()));
    this.push(chunk);
    callback();
  });
};
