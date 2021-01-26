const path = require('path');
const t = require('@babel/types');

module.exports = ({ dirname, rules }) => {
  return {
    // 访问 import 声明语句
    ImportDeclaration(_path) {
      const {
        node: {
          specifiers,
          source: { value },
        },
      } = _path;
      // 不是相对路径
      if (/\./.test(value)) {
        return;
      }

      const fullpath = path.resolve(dirname, value);

      for (let i = 0, len = rules.length; i < len; i += 1) {
        const { match, redirect } = rules[i];
        if (fullpath.includes(match)) {
          const relative = path.relative(match, fullpath);
          const result = path.join(redirect, relative);

          _path.replaceWith(
            t.importDeclaration(specifiers, t.stringLiteral(result))
          );
          return;
        }
      }
    },
  };
};
