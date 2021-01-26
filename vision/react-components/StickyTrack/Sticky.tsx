import React, { useContext, useEffect, useRef } from 'react';
import { TrackContext } from './Track';

interface IStickyProps {
  style?: React.CSSProperties;
  className?: string;
}

const Sticky: React.FC<React.PropsWithChildren<IStickyProps>> = ({ children, className, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const emit = useContext(TrackContext);

  useEffect(() => {
    return emit({
      el: ref.current as HTMLDivElement,
      content: children,
    });
  }, [emit, children]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export default React.memo(Sticky);
