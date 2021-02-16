/* eslint-disable */
// @ts-nocheck
import { useEffect, useReducer } from 'react';
import Loading from './Loading';

let isFetching = false;
let isFetched = false;
let iconsMap;
let callbackQueue = [];

const fetchIcons = () => {
  isFetching = true;
  import('./map')
    .then((res) => {
      isFetched = true;
      iconsMap = res.default;

      callbackQueue.forEach((callback) => {
        callback();
      });
      callbackQueue = [];
    })
    .catch(() => {
      isFetching = false;
    });
};

// 预加载
fetchIcons();

/**
 * 获取icon
 *
 * */
export default function useIcons(type) {
  const [, forceUpdate] = useReducer((v) => v + 1, 0);
  const _isFetched = isFetched;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (_isFetched) {
      return;
    }

    if (_isFetched !== isFetched) {
      // 因为useEffect是异步的，但是useIcons是同步返回的，也就是说
      // 可能返回的时候数据还没请求好，但是useEffect执行的时候数据
      // 已经请求完成，此时只需要更新组件就好
      forceUpdate();
      return;
    }

    if (!isFetched) {
      // 预加载可能失败，所以在每个组件内都要判断如果加载失败，继续加载
      fetchIcons();
    }

    if (isFetching || !isFetched) {
      // 如果组件渲染完成后，请求还在进行中，则把用于更新组件的回调函数
      // push进callback队列，待请求完成后统一更新组件
      callbackQueue.push(forceUpdate);

      // eslint-disable-next-line consistent-return
      return () => {
        const index = callbackQueue.indexOf(forceUpdate);
        callbackQueue.splice(index, 1);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isFetched ? iconsMap[type] : Loading;
}
