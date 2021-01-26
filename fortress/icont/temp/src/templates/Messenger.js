const key = 'iconssss';
let postLocked = false;

/**
 * 监听信息
 *
 * */
const onMessage = callback => {
  const listener = event => {
    if (event.key !== key) {
      return;
    }
    callback(event.newValue);
  };

  window.addEventListener('storage', listener);

  return () => {
    window.removeEventListener('storage', listener);
  };
};

/**
 * 发送信息
 *
 * */
const postMessage = message => {
  if (postLocked) {
    return;
  }

  if (typeof message !== 'string') {
    throw TypeError('message必须为String');
  }

  window.localStorage.setItem(key, message);
};

/**
 * 从缓存中获取信息
 *
 * */
const getMessageFromCache = () => {
  return window.localStorage.getItem(key);
};

export default {
  onMessage,
  postMessage,
  getMessageFromCache,
};
