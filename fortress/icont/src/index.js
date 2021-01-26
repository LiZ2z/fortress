/* eslint-disable func-names */
// eslint-disable-next-line import/no-extraneous-dependencies
const { src, dest } = require('@flamma/fio');
const { default: svgo } = require('./middlewares/svgo');
const { default: svgPostProcess } = require('./middlewares/svgPostProcess');
const { camelize, capitalize } = require('./utils');

module.exports = function (options) {
  const filenames = [];

  src(options.src)
    .on('data', (fakeFile) => {
      fakeFile.basename = capitalize(camelize(fakeFile.basename));
      // fakeFile.extname = '.jsx';
      return fakeFile;
    })
    .pipe(svgo())
    .pipe(svgPostProcess())
    .on('data', (fakeFile) => {
      filenames.push(fakeFile.basename);
    })
    .pipe(dest(options.dest))
    .on('end', () => {
      console.log('end');
    });
};
