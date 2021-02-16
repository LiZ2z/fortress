const path = require('path');
const fs = require('fs-extra');
const renderFile = require('./renderFile');
const constants = require('../constants');

module.exports = async function renderIconFiles({ dest, prefix: _prefix }) {
  const prefix = _prefix || constants.PREFIX;

  const [js, css] = await Promise.all([
    renderFile(path.resolve(__dirname, 'template/index.jsx.ejs'), {
      prefix,
    }),
    renderFile(path.resolve(__dirname, 'template/style.css.ejs'), {
      prefix,
    }),
  ]);

  return Promise.all([
    fs.outputFile(path.resolve(dest, 'index.js'), js),
    fs.outputFile(path.resolve(dest, 'style.css'), css),
  ]);
};
