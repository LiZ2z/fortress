const { series, src, dest } = require('gulp');
const babel = require('./src/gulp-babel');

const dir = '/Users/lishuang/code/prometheus-front/packages/tests';

function redirect() {
  return src(`${dir}/**/*.ts`)
    .pipe(
      babel({
        rules: [
          {
            match: '/Users/lishuang/code/prometheus-front/packages/types',
            redirect: 'bi-types',
          },
          { 
            match: ''
          }
        ],
      })
    )
    .pipe(dest(dir));
}

exports.default = series(redirect);
