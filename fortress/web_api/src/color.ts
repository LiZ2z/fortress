// FIXME: 转换计算涉及浮点数运算，导致误差
enum Mode {
  HSL = 'HSL',
  RGB = 'RGB',
  HEX = 'HEX',
}

interface HSLValue {
  // [0-360]
  h: number;
  // [0-1]
  s: number;
  l: number;
}

// 取值：[0-255]
const maxRgbValue = 255;
interface RGBValue {
  r: number;
  g: number;
  b: number;
}

type HEXValue = [number, number, number];

type Value = HSLValue | RGBValue | HEXValue;

const space = '[\u0020\\s]*';
const float = '\\d+(?:\\.\\d+)?';
// TODO: RGBA 与 RGB合成一个
const RGBRegArr = [
  '^',
  'rgb',
  '\\(',
  '(\\d+)',
  ',',
  '(\\d+)',
  ',',
  '(\\d+)',
  ',?',
  '\\)',
  '$',
];
const RGBRegExp = new RegExp(RGBRegArr.join(space), 'i');
const RGBARegArr = [
  '^',
  'rgba',
  '\\(',
  '(\\d+)',
  ',',
  '(\\d+)',
  ',',
  '(\\d+)',
  ',',
  `(${float})`,
  ',?',
  '\\)',
  '$',
];
const RGBARegExp = new RegExp(RGBARegArr.join(space), 'i');
// 16 进制
const HEXStr = `[0-9a-fA-F]{2}`;
const HEXRegExp = new RegExp(
  `^${space}#(${HEXStr})(${HEXStr})(${HEXStr})${space}$`
);

// const HSLRegArr = [
//   '^',
//   'hsl',
//   '\\(',
//   `(${float})`,
//   ',',
//   `(${float})`,
//   ',',
//   `(${float})`,
//   ',?',
//   '\\)',
//   '$',
// ];
// const HSLRegExp = new RegExp(HSLRegArr.join(space), 'i');

class Color {
  private mode: Mode;

  private value: Value;

  private alpha: number;

  constructor(color: string) {
    const result = Color.parse(color);
    this.mode = result.mode;
    this.value = result.value;
    this.alpha = result.alpha;
  }

  static of(color: string) {
    return new Color(color);
  }

  static parse(color: string): { mode: Mode; value: Value; alpha: number } {
    if (RGBRegExp.test(color) || RGBARegExp.test(color)) {
      return {
        mode: Mode.RGB,
        value: {
          r: Number(RegExp.$1),
          g: Number(RegExp.$2),
          b: Number(RegExp.$3),
        },
        alpha: Number(RegExp.$4 || 1),
      };
    }

    if (HEXRegExp.test(color)) {
      const hex2dec = (hex: string) => Number(`0x${hex}`);
      return {
        mode: Mode.HEX,
        value: [hex2dec(RegExp.$1), hex2dec(RegExp.$2), hex2dec(RegExp.$3)],
        alpha: 1,
      };
    }

    // if (HSLRegExp.test(color)) {
    //   return {
    //     mode: Mode.HSL,
    //     value: {
    //       h: Number(RegExp.$1),
    //       s: Number(RegExp.$2),
    //       l: Number(RegExp.$3),
    //     },
    //     alpha: 1,
    //   };
    // }

    throw Error('不支持的类型');
  }

  static rgb2hsl({ r, g, b }: RGBValue): HSLValue {
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    const h = (() => {
      if (max === min) {
        return 0;
      }
      if (max === r) {
        if (g >= b) {
          return 60 * ((g - b) / (max - min)) + 0;
        }
        return 60 * ((g - b) / (max - min)) + 360;
      }
      if (max === g) {
        return 60 * ((b - r) / (max - min)) + 120;
      }
      // max === b
      return 60 * ((r - g) / (max - min)) + 240;
    })();

    const s = (() => {
      if (max === 0) {
        return 0;
      }
      return 1 - min / max;
    })();

    // v = max;
    const l = (max + min) / 2 / maxRgbValue;

    return {
      h: Math.round(h),
      s: Number(s.toFixed(2)),
      l: Number(l.toFixed(2)),
    };
  }

  static hsl2rgb({ h, s, l }: HSLValue): RGBValue {
    if (s === 0) {
      const v = Math.round(l * 255);
      return {
        r: v,
        g: v,
        b: v,
      };
    }

    const q = (() => {
      if (l < 0.5) {
        return l * (1 + s);
      }
      return l + s - l * s;
    })();
    const p = 2 * l - q;
    // 将h范围转换为：[0-1]
    const h_k = h / 360;

    const t_r = h_k + 1 / 3;
    const t_g = h_k;
    const t_b = h_k - 1 / 3;
    const [r, g, b] = [t_r, t_g, t_b]
      .map(item => {
        let t = item;
        if (t < 0) {
          t += 1;
        }
        if (t > 1) {
          t -= 1;
        }
        if (t < 1 / 6) {
          return p + (q - p) * 6 * t;
        }
        if (t >= 1 / 6 && t < 1 / 2) {
          return q;
        }
        if (t >= 1 / 2 && t < 2 / 3) {
          return p + (q - p) * 6 * (2 / 3 - t);
        }
        return p;
      })
      .map(t => Math.round(t * 255));

    return {
      r,
      g,
      b,
    };
  }

  static hex2rgb([r, g, b]: HEXValue) {
    return { r, g, b };
  }

  static hex2hsl(hex: HEXValue) {
    const rgb = Color.hex2rgb(hex);
    return Color.rgb2hsl(rgb);
  }

  static lighten({ h, s, l }: HSLValue, ratio: number): HSLValue {
    // TODO: 不一定对
    const _l = (1 + ratio) * l;
    return {
      h,
      s,
      l: _l,
    };
  }

  hsl() {
    if (this.mode === Mode.RGB) {
      this.value = Color.rgb2hsl(this.value as RGBValue);
    } else if (this.mode === Mode.HEX) {
      this.value = Color.hex2hsl(this.value as HEXValue);
    }
    this.mode = Mode.HSL;
    return this;
  }

  rgb() {
    if (this.mode === Mode.HSL) {
      this.value = Color.hsl2rgb(this.value as HSLValue);
    } else if (this.mode === Mode.HEX) {
      this.value = Color.hex2rgb(this.value as HEXValue);
    }
    this.mode = Mode.RGB;
    return this;
  }

  lighten(ratio: number): this {
    if (this.mode !== Mode.HSL) {
      return this.hsl().lighten(ratio);
    }

    this.value = Color.lighten(this.value as HSLValue, ratio);
    return this;
  }

  getValue() {
    const { mode, value } = this;
    return {
      mode,
      value: Array.isArray(value) ? [...value] : { ...value },
    };
  }

  toString() {
    const { mode, value } = this;
    switch (mode) {
      case Mode.RGB: {
        const { r, g, b } = value as RGBValue;
        return `rgb(${r},${g},${b})`;
      }

      //   case Mode.HSL: {
      //     const { h, s, l } = value as HSLValue;
      //     return `hsl(${h}, ${s}%, ${l}%)`;
      //   }

      default: {
        throw Error('暂不支持');
      }
    }
  }
}

export default Color;
