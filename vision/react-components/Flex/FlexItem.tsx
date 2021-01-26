import React from 'react';
import cNs from 'classnames';
import styles from './style.m.scss';

export type Flex = '0' | '1' | 'auto' | 'none';

interface IFlexItemProps {
  Tag?: React.ElementType;
  flex?: Flex;
  className?: string;
  [key: string]: unknown;
}

const FlexItem: React.FC<React.PropsWithChildren<IFlexItemProps>> = (
  { Tag = 'div', flex = 'none', className, ...rest }: IFlexItemProps,
  ref,
) => {
  const classNames = cNs(styles[`flex-${flex}`], className);

  return <Tag {...rest} ref={ref} className={classNames} />;
};

// @ts-ignore
// FIXME: typo
export default React.forwardRef(FlexItem) as typeof FlexItem;
