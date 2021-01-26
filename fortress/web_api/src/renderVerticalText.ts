import { verticalEllipsis } from '../components/text';

interface Config {
  text: string;
  count: number;
}

/**
 * 将普通的字符串按照格式化成如下格式用于echarts渲染：
 *
 * "诺诺网"
 *  ↓↓↓↓↓↓
 * --------------
 *    诺
 *    诺
 *    网
 *
 * NOTE: 需要结合echarts rich属性使用
 *
 * 对于按照高度限制竖直文本高度的情况，只需要按照 Math.floor(限制高度/行高)
 * 计算出限制字数即可
 *
 * */
export default function renderVerticalText({ text, count }: Config): string {
  const shouldSlice = text.length > count;
  const subText = shouldSlice ? text.substring(0, count) : text;
  const verticalText = subText.split('').join('\n');

  if (shouldSlice) {
    return `{text|${verticalText}}\n{ellipsis|${verticalEllipsis.text}}`;
  }

  return `{text|${verticalText}}`;
}
