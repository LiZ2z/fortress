const hexReg = `[0-9a-fA-F]{2}`;
const hexColorReg = `^#(${hexReg}){3}$`;

/**
 * 16进制颜色转RGB
 *
 * */
export const hexColorToRGB = (hexColor: string): [number, number, number] => {
  if (!new RegExp(hexColorReg).test(hexColor)) {
    throw Error(
      `hexColor的格式必须为： #xxxxxx（x: 0-9 a-f）。当前格式为：${hexColor}`
    );
  }

  const hexs = hexColor.match(new RegExp(hexReg, 'g')) as [
    string,
    string,
    string
  ];

  const secimals = hexs.map(hex => Number(`0x${hex}`)) as [
    number,
    number,
    number
  ];

  return secimals;
};

export const rgbArrToRgbaStr = (
  rgbArr: [number, number, number],
  alpha: number
): string => {
  return `rgba(${rgbArr.join(',')} , ${alpha})`;
};
