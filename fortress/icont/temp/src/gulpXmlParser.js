const through2 = require('through2');
const createParser = require('./xmlParser/parser');

const xmlParser = ({ transform, generator }) => {
  const parser = createParser();

  return through2.obj(function (file, _, callback) {
    parser.parse(file.contents.toString());

    const ast = parser.getAst();
    const processedAst = transform(ast, { filename: file.stem });
    
    const codeStr = generator(file.stem, processedAst);

    file.contents = Buffer.from(codeStr);

    this.push(file);

    callback();
  });
};

module.exports = xmlParser;
