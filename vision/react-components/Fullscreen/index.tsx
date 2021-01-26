import React, { useEffect, useRef } from 'react';
import fscreen from 'fscreen';
import useDidUpdate from 'bi-react-hooks/useDidUpdate';

interface IFullscreenProps {
  // Tag: React.ElementType;
  value: boolean;
  onError: (error: Event | Error | undefined) => void;
  onChange: (isFullscreen: boolean) => void;
  [prop: string]: any;
}

const noWork = () => undefined;

const Fullscreen: React.FC<IFullscreenProps> = ({ value, onError = noWork, onChange = noWork, ...rest }) => {
  const elRef = useRef<HTMLDivElement>(null);

  // 不支持初次执行的时候直接全屏，等出现这个场景的时候再修改
  useDidUpdate(() => {
    if (!elRef.current) {
      return;
    }

    if (!fscreen.fullscreenEnabled) {
      onError(new Error('浏览器不支持（或未启用）全屏功能'));
      return;
    }

    const resolveResult = (result: any) => {
      // 有些低级浏览器在调用 requestFullscreen() 后不会返回任何值
      // 高级浏览器一般会返回promise
      if (result && result.then) {
        result.catch(onError);
      }
    };

    if (value) {
      // requset fullscreen
      if (fscreen.fullscreenElement !== null) {
        onError(new Error('当前已处于全屏状态'));
        return;
      }

      const result = fscreen.requestFullscreen(elRef.current);
      resolveResult(result);
    } else {
      // exit fullscreen
      if (fscreen.fullscreenElement === null) {
        return;
      }

      const result = fscreen.exitFullscreen();
      resolveResult(result);
    }
  }, [value]);

  useDidUpdate(() => {
    // 监听非此组件触发的全屏事件，例如：
    // - esc \ f11 按键导致的退出全屏
    // - 其他代码的全屏操作
    const changeHandler = () => {
      if (fscreen.fullscreenElement === null && value) {
        onChange(false);
        return;
      }

      if (fscreen.fullscreenElement === elRef.current && !value) {
        onChange(true);
      }
    };
    fscreen.addEventListener('fullscreenchange', changeHandler);
    return () => {
      fscreen.removeEventListener('fullscreenchange', changeHandler);
    };
  }, [onChange, value]);

  useEffect(() => {
    fscreen.addEventListener('fullscreenerror', onError);
    return () => {
      fscreen.removeEventListener('fullscreenerror', onError);
    };
  }, [onError]);

  return <div ref={elRef} {...rest} />;
};

export default Fullscreen;
