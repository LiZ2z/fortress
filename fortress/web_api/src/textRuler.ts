import { setCSSFont, CSSFont } from './cssFont';

/**
 * 创建一个测量字符绘制像素宽度的尺子📏
 *
 * */
export default function createTextRuler() {
  const canvas = document.createElement('canvas');
  const ctx2D = canvas.getContext('2d');

  if (!ctx2D) {
    throw Error('该浏览器不支持canvas，请使用现代浏览器');
  }

  /**
   * 计算通过css样式设置的字体绘制出的字符的宽度。
   *
   * */
  const measureText = (char: string, font?: CSSFont): number => {
    ctx2D.font = setCSSFont(font);
    const text = ctx2D.measureText(char);
    return text.width;
  };

  const get2DContext = () => {
    return ctx2D;
  };

  return {
    measureText,
    get2DContext,
  };
}
