import React, { useCallback, useRef, useState } from 'react';
import cNs from 'classnames';
import styles from './style.m.scss';

interface IStickyTrackProps {
  children: React.ReactNode;
  className?: string;
  stickyClassName?: string;
}

interface IEmitValue {
  el: HTMLDivElement;
  content: React.ReactNode;
}

export const TrackContext = React.createContext<(v: IEmitValue) => void>(() => undefined);

const computeEffects = (
  stickies: IEmitValue[],
  scrollTop: number,
  stickyHeight: number,
): {
  renderEffect: React.ReactNode;
  offsetEffect?: number;
} => {
  let index = 0;

  for (let i = 0, len = stickies.length; i < len; i += 1) {
    const {
      el: { offsetTop },
    } = stickies[i];

    if (offsetTop < scrollTop) {
      index = i;
    } else if (offsetTop >= scrollTop && offsetTop < scrollTop + stickyHeight) {
      const offset = offsetTop - (scrollTop + stickyHeight);
      return {
        offsetEffect: offset,
        renderEffect: (stickies[i - 1] || stickies[i]).content,
      };
    } else {
      return {
        renderEffect: (stickies[index] || stickies[0]).content,
      };
    }
  }

  return {
    renderEffect: stickies[0].content,
  };
};

const StickyTrack: React.FC<IStickyTrackProps> = ({ children, className, stickyClassName }) => {
  const stickiesRef = useRef<IEmitValue[]>([]);
  const [offsetTop, setOffsetTop] = useState(0);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const stickyHeightRef = useRef(0);

  const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = event.currentTarget;
    if (stickiesRef.current.length === 0) {
      return;
    }

    const { renderEffect, offsetEffect } = computeEffects(stickiesRef.current, scrollTop, stickyHeightRef.current);

    setContent(renderEffect);
    setOffsetTop(offsetEffect || 0);
  };

  const emit = useCallback((v: IEmitValue) => {
    const stickies = stickiesRef.current;
    stickies.push(v);
    let removed = false;

    if (stickyHeightRef.current === 0) {
      stickyHeightRef.current = v.el.clientHeight;
    }

    return () => {
      if (removed) {
        return;
      }
      removed = true;
      stickies.splice(stickies.indexOf(v), 1);
    };
  }, []);

  return (
    <div className={cNs(styles.stickyTrack, className)}>
      <div className={cNs(styles.sticky, stickyClassName)} style={{ transform: `translate3d(0,${offsetTop}px,0)` }}>
        {content}
      </div>
      <TrackContext.Provider value={emit}>
        <div className={styles.track} onScroll={scrollHandler}>
          {children}
        </div>
      </TrackContext.Provider>
    </div>
  );
};

export default React.memo(StickyTrack);
