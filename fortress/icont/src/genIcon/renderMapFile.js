const fs = require('fs');
const path = require('path');
const { hyphenate } = require('../utils');
const renderFile = require('./renderFile');
const constants = require('../constants');

/**
 * 生成 icons map文件
 */
module.exports = async function renderMapFile({ dest }, filenames) {
  const [js, ts] = await Promise.all([
    renderFile(
      path.resolve(__dirname, 'template/map.js.ejs'),
      { filenames, dir: constants.ICONS_DIR },
      {
        context: {
          hyphenate,
        },
      }
    ),
    renderFile(
      path.resolve(__dirname, 'template/map.d.ts.ejs'),
      {
        filenames,
      },
      {
        context: {
          hyphenate,
        },
      }
    ),
  ]);

  return Promise.all([
    fs.promises.writeFile(path.resolve(dest, 'map.js'), js),
    fs.promises.writeFile(path.resolve(dest, 'map.d.ts'), ts),
  ]);
};
