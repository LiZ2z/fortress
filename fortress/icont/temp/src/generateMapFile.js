const fs = require('fs');
// const format = require('./prettier');
const { hyphenate } = require('./utils');

/**
 * 生成 icons map文件
 *
 * */
module.exports = async function generateMapfile(outputPath, fileNames) {
  const importsContent = fileNames
    .map(fileName => `import ${fileName} from './${fileName}';`)
    .join('\n');

  const exportContent = fileNames
    .map(fileName => `    '${hyphenate(fileName)}': ${fileName}`)
    .join(',\n');

  const fileContentStr = `
${importsContent}

const iconsMap = {
${exportContent}
};

export type IconType = keyof typeof iconsMap;
export default iconsMap;
    `;

  // const prettyContent = format(fileContentStr);

  try {
    await fs.promises.writeFile(outputPath, fileContentStr);

    console.log();
    console.log('-------------icons map文件写入成功-------------');
    console.log();
  } catch (error) {
    console.log();
    console.log('------------icons map文件写入失败---------------');
    console.log();
  }
};
