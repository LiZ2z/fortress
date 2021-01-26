const path = require('path');
const { src, dest } = require('gulp');
const rename = require('gulp-rename');
const xmlParser = require('./gulpXmlParser');
const astTransform = require('./xmlParser/transform');
const reactComponentGenerator = require('./reactComponentGenerator');
const generateMapfile = require('./generateMapFile');
const { camelize, capitalize } = require('./utils');

const SRC_PATH = path.resolve(__dirname, '../../src/assets/iconfontSvg');
const DEST_PATH = path.resolve(__dirname, '../../src/components/Icon/Icons');
const MAP_FILE_PATH = path.resolve(DEST_PATH, 'iconsMap.ts');

/**
 * 剔除属性
 * */

const excludeAttrs = [
  'id',
  't',
  'class',
  'version',
  'p-id',
  'xmlns',
  'xmlns:xlink',
  'xlink:href',
];

/**
 * 保留原色彩的Icons
 * */
const ignoreColorSvg = [
  'zhuzhuangtu',
  'zhibiaoka',
  'zhexianzhuzhuang',
  'zhexiantu',
  'yuanquantu',
  'yibiaopan',
  'tiaoxing',
  'shanxing',
  'liebiao',
  'duijitu',
  'emptyChart',
  'two-d-map-1',
  'two-d-map-2',
  'two-d-map-3',
];

// TODO: 对style 属性处理

/**
 *
 */
module.exports = function genIcons() {
  console.log();
  console.log('注意: 中文名的文件会被直接忽略的哦');
  console.log();

  const filenames = [];
  const renamedIgnoreColorSvg = [];

  return src(`${SRC_PATH}/[a-zA-Z0-9]*.svg`)
    .pipe(
      rename(path => {
        const rawName = path.basename;
        const newName = capitalize(camelize(rawName));
        path.basename = newName;
        path.extname = '.jsx';

        filenames.push(newName);

        if (ignoreColorSvg.includes(rawName)) {
          renamedIgnoreColorSvg.push(newName);
        }
      })
    )
    .pipe(
      xmlParser({
        transform: astTransform({
          onTag(element, meta) {
            element.rawAttrs = element.attrs;

            if (element.tag === 'svg') {
              if (!renamedIgnoreColorSvg.includes(meta.filename)) {
                element.attrs.fill = 'currentColor';
              }
            }
          },
          onAttr(name, value, element, meta) {
            const { attrs, rawAttrs } = element;

            if (excludeAttrs.includes(name)) {
              delete attrs[name];
              return;
            }

            const camelizedName = camelize(name);

            switch (name) {
              case 'fill': {
                if (
                  !renamedIgnoreColorSvg.includes(meta.filename) &&
                  element.tag !== 'svg'
                ) {
                  delete attrs.fill;
                }
                break;
              }

              case 'width': {
                attrs.width = '100%';
                break;
              }

              case 'height': {
                attrs.height = `${
                  (rawAttrs.height / rawAttrs.width) * 100 || 100
                }%`;
                break;
              }

              default: {
                delete attrs[name];
                attrs[camelizedName] = value;
                break;
              }
            }
          },
        }),
        generator: reactComponentGenerator,
      })
    )
    .pipe(dest(DEST_PATH))
    .on('end', () => {
      generateMapfile(MAP_FILE_PATH, filenames);
    });
};
