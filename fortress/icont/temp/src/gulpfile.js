const { series } = require('gulp');
const genIcons = require('./genIcons');

exports.default = series(genIcons);
