/* eslint-disable func-names */
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const { src, dest } = require('@flamma/fio');
const useSvgo = require('./middlewares/svgo');
const { camelize } = require('./utils');
// const { default: svgPostProcess } = require('./middlewares/svgPostProcess');
const useWrapWithExport = require('./middlewares/wrapWithExport');
const genIcon = require('./genIcon');
const constants = require('./constants');

module.exports = function processSVG(options) {
  const filenames = [];

  src(options.src)
    .pipe(useSvgo())
    .on('data', (fakeFile) => {
      fakeFile.basename = camelize(fakeFile.basename);
      fakeFile.extname = '.js';
      filenames.push(fakeFile.basename);
      return fakeFile;
    })
    .pipe(useWrapWithExport())
    .on('data', (fakeFile) => {
      if (filenames.length < 8) {
        return fakeFile;
      }
      genIcon(options, filenames);
      return fakeFile;
    })
    .pipe(dest(path.resolve(options.dest, constants.ICONS_DIR)))
    .on('end', () => {
      // generateMapFile(options, filenames);
      console.log('end');
    });
};
