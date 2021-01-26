// @ts-nocheck
// FIXME: typo
import React from 'react';
import cNs from './classNames';
import styles from './style.m.scss';

export type Flex = '0' | '1' | 'auto' | 'none';

interface FlexItemProps {
  Tag?: React.ElementType;
  flex?: Flex;
  className?: string;
  [key: string]: unknown;
}

const FlexItem: React.FC<React.PropsWithChildren<FlexItemProps>> = (
  { Tag = 'div', flex = 'none', className, ...rest }: FlexItemProps,
  ref
) => {
  const classNames = cNs(styles[`flex-${flex}`], className);

  return <Tag {...rest} ref={ref} className={classNames} />;
};

export default React.forwardRef(FlexItem) as typeof FlexItem;
