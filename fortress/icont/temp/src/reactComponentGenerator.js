/**
 * 拼接属性
 *
 * */
const combineAttrs = attrs => {
  return Object.entries(attrs)
    .map(([key, value]) => `${key}='${value}'`)
    .join(' ');
};

/**
 * ast生成元素字符串
 *
 * */
const generateElementStr = (tag, attrs, children) => {
  return `<${tag} ${combineAttrs(attrs)}>${children}</${tag}>`;
};

/**
 * 递归xml ast 生成 jsx
 *
 * */
const renderEl = el => {
  const children = el.children.map(renderEl).join('\n');
  return generateElementStr(el.tag, el.attrs, children);
};

const renderSvgJsx = xmlAst => {
  const svg = xmlAst.find(element => element.tag === 'svg');

  if (!svg) {
    return null;
  }

  return renderEl(svg);
};

const generateReactComponent = (name, xmlAst) => {
  return `
import React from 'react';

export default function ${name} () {
    return (${renderSvgJsx(xmlAst)});
} 
      `;
};

module.exports = generateReactComponent;
