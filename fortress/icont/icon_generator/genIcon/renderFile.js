const ejs = require('ejs');

module.exports = function renderFile(filename, data, options) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(filename, data, options, (err, str) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(str);
    });
  });
};
