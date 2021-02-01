const fs = require('fs-extra');
const path = require('path');

module.exports = async function copyFiles({ dest }) {
  const filenames = ['index.d.ts', 'Loading.js', 'useIcons.js'];
  return Promise.all(
    filenames.map((filename) =>
      fs.copy(
        path.resolve(__dirname, `template/${filename}`),
        path.resolve(dest, filename),
        {
          overwrite: true,
        }
      )
    )
  );
};
