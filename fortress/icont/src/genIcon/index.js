const copyFiles = require('./copyFiles');
const renderIconFiles = require('./renderIconFiles');
const renderMapFile = require('./renderMapFile');

module.exports = async function genIcon(options, filenames) {
  try {
    await Promise.all([
      renderMapFile(options, filenames),
      renderIconFiles(options),
      copyFiles(options),
    ]);
    console.log('----------------- 生成Icons成功 -----------------');
  } catch (error) {
    console.log();
    console.log('----------------- 生成Icons失败 -----------------');
    console.log(error);
  }
};
