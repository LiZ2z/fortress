/**
 * 设置 cookie
 */
export const setCookie = (
  key: string,
  value: string,
  expires: string = 'Session'
) => {
  document.cookie = `${key}=${value};expires=${expires}`;
};

export const getCookie = <T extends string>(key: string) => {
  const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  // FIXME: 这里的as不好
  return arr ? (arr[2] as T) : null;
};

export const removeCookie = (key: string) => {
  const dayMs = -1 * 24 * 60 * 60 * 1000;
  const date = new Date(+new Date() + dayMs);
  const expires = date.toUTCString();
  document.cookie = `${key}='';expires=${expires};`;
};

/**
 * 创建cookie管理器，拥有好的语法提示及错误检查。
 *
 * @example
 * export const 季节 = cookies.createCookieManager<'春' | '秋'>('季节');
 * 季节.set('春'); // 正确
 * 季节.set('夏'); // 错误
 * */
export const createCookieManager = <T extends string = string>(key: string) => {
  const cookieManager = {
    set: (value: T, expires?: string): void => setCookie(key, value, expires),
    get: (): T | null => getCookie(key),
    remove: () => {
      removeCookie(key);
    },
  };

  return cookieManager;
};

export const clear = () => {
  const cookiesStr = document.cookie;
  const cookies = cookiesStr.split(';');
  cookies.forEach(cookie => {
    const cookieKey = cookie.split('=')[0];
    removeCookie(cookieKey);
  });
};

export default {
  clear,
  createCookieManager,
  setCookie,
  getCookie,
};
