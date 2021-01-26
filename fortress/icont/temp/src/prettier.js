const prettier = require('prettier');

const config = prettier.resolveConfig.sync(process.cwd());

module.exports = content => {
  return prettier.format(content, {
    ...config,
    parser: 'babel',
  });
};
