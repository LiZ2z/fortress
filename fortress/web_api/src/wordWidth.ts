import textRuler from './textRulerInstance';

const zhWords = `等宽中文二十字符那是我逝去的青春世界和平`;

export const twentyZhCNCharsLen = textRuler.measureText(zhWords, {
  fontFamily: 'sans-serif',
  fontSize: '14px',
});

export const sin30Len = twentyZhCNCharsLen / Math.sin(Math.PI / 6);

export const sin60Len = twentyZhCNCharsLen / Math.sin(Math.PI / 3);
