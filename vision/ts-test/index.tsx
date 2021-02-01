// @ts-nocheck
/* eslint-disable */
import React, { useMemo } from 'react';
import cn from 'classnames';
import useIcons from './useIcons';
import './style.css';
import { IconType } from './map';

interface BIIconProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  type: IconType;
}

const BIIcon = (
  { className, type, ...rest }: BIIconProps,
  ref:
    | ((instance: HTMLElement | null) => void)
    | React.RefObject<HTMLElement>
    | null
) => {
  const Icon = useIcons(type);

  const _classname = useMemo(
    () => cn('bi-icon', `bi-icon-${type}`, className),
    [className, type]
  );

  if (!Icon) {
    if (process.env.NODE_ENV === 'development') {
      throw Error(`没找到Icon：${type}，快去去加一个`);
    }
    return null;
  }

  return (
    <i {...rest} ref={ref} className={_classname}>
      <Icon />
    </i>
  );
};

export default React.forwardRef(BIIcon);
