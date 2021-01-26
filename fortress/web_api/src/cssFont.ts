export interface CSSFont {
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string; // normal | italic | oblique <angle>?
  fontVariant?: string;
  lineHeight?: string;
  fontStretch?: string;
}

/**
 * 规则：
 *
 * + 必须包含以下值：
 *      - <font-size>
 *      - <font-family>
 * + 可以选择性包含以下值：
 *      - <font-style>
 *      - <font-variant>
 *      - <font-weight>
 *      - <line-height>
 * + font-style, font-variant 和 font-weight 必须在 font-size 之前
 * + 在 CSS 2.1 中 font-variant 只可以是 normal 和 small-caps
 * + line-height 必须跟在 font-size 后面，由 "/" 分隔，例如 "16px/3"
 * + font-family 必须最后指定
 *
 * 正式语法：
 *
 * `[ [ <'font-style'> || <font-variant-css21> || <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ]`
 *
 * */
export const setCSSFont = (
  {
    fontWeight = 'normal',
    fontSize = '16px',
    fontFamily = 'sans-serif',
    fontStyle = 'normal',
    fontVariant = 'normal',
    lineHeight = '1',
    fontStretch = 'normal',
  }: CSSFont = {} as CSSFont
): string => {
  return `${fontStyle} ${fontVariant} ${fontWeight} ${fontStretch} ${fontSize}/${lineHeight} ${fontFamily}`;
};
