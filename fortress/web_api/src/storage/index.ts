import storageApi from './storageApi';

/**
 * IE（11）中必须在服务器环境下访问项目才能使用window.localStorage 或 window.sessionStorage
 *
 * */
export const localStorage = storageApi(window.localStorage);

/**
 * IE（11）中必须在服务器环境下访问项目才能使用window.localStorage 或 window.sessionStorage
 *
 * */
export const sessionStorage = storageApi(window.sessionStorage);

export default {
  localStorage,
  sessionStorage,
};
