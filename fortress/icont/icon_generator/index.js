/* eslint-disable func-names */
const path = require('path');
const { src, dest } = require('gulp');
const useSvgo = require('./middlewares/svgo');
const { camelize } = require('./utils');
// const { default: svgPostProcess } = require('./middlewares/svgPostProcess');
const useWrapWithExport = require('./middlewares/wrapWithExport');
const genIcon = require('./genIcon');
const constants = require('./constants');

module.exports = function processSVG(options) {
  const filenames = [];

  src(options.src)
    /* 使用svgo 优化svg xml */
    .pipe(useSvgo())
    /* 将 .svg文件转换成 .js 文件，并统一文件名 */
    .on('data', (vinyl) => {
      vinyl.extname = '.js';
      vinyl.basename = camelize(vinyl.basename);
      filenames.push(path.basename(vinyl.basename, vinyl.extname));
      return vinyl;
    })
    /* 替换文件内容 */
    .pipe(useWrapWithExport())
    /* 将转换成 .js 文件输出到文件夹 */
    .pipe(dest(path.resolve(options.dest, constants.ICONS_DIR)))
    .on('end', () => {
      genIcon(options, filenames);
    });
};
