/**
 * 将一个数值转为百分比显示。(转换过程，默认保留两位小数)
 *
 * 23  =>  2300%
 * 0.12  =>  12%
 *
 * */
export default function computePercent(total: number, value: number): string {
  const float = Math.abs((value / total) * 100);
  const percent = float.toFixed(2);
  return percent;
}
