/**
 * 截取 **指定数量中文字符宽度** 的字符串，超过的部分舍弃
 *
 * */
export default function subString(str: string, len: number): string {
  if (str.length < len) {
    return str;
  }

  // 按照实际长度进行截取
  const subStr = str.substring(0, len);
  // 在截取后的字符串中查找，属于ascii编码的字符，因为这些字符宽度只有中文一半
  // （其他半角字符基本不会出现，所以不做考虑）
  const enChars = subStr.match(/[\u20-\u7f]/g);

  // 如果ascii编码的字符数量大于1个，则实际截取的字符串长度会比预想的
  // 长度小很多，所以需要补齐
  if (enChars && enChars.length > 1) {
    const restLen = Math.floor(enChars.length / 2);

    return subStr + subString(str.substring(len), restLen);
  }

  return subStr;
}
