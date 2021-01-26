/* eslint-disable no-param-reassign */
const through2 = require('through2');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const visitor = require('./babel-plugin-redirect');

module.exports = (opts) => {
  return through2.obj(function (file, _, callback) {
    const sourceCode = file.contents.toString();

    const ast = parser.parse(sourceCode, {
      plugins: ['typescript'],
      sourceType: 'module',
    });

    traverse(ast, visitor({ dirname: file.dirname, rules: opts.rules }));

    const { code } = generate(
      ast,
      {
        retainLines: true,
      },
      sourceCode
    );

    file.contents = Buffer.from(code);

    this.push(file);

    callback();
  });
};
