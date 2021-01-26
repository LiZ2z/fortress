const defaultVisitor = {
  onTag: () => undefined,
  onAttr: () => undefined,
};

/**
 * 遍历 xml ast
 *
 * */
const travelAst = (ast, meta, visitor) => {
  const options = { ...defaultVisitor, ...visitor };

  ast.forEach(element => {
    options.onTag(element, meta);

    Object.entries(element.attrs).forEach(([key, value]) => {
      options.onAttr(key, value, element, meta);
    });

    if (element.children && element.children.length) {
      travelAst(element.children, meta, options);
    }
  });

  return ast;
};

module.exports = function transformAst(visitor) {
  return (ast, meta) => {
    return travelAst(ast, meta, visitor);
  };
};
