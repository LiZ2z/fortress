import React from 'react';
import cNs from 'classnames';
import { Flex as FlexType } from './FlexItem';
import styles from './style.m.scss';

export type Justify = 'center' | 'space-between' | 'space-around' | 'flex-start' | 'flex-end';

export type Align = Justify;

interface IFlexProps {
  Tag?: React.ElementType;
  justify?: Justify;
  align?: Align;
  vertical?: boolean;
  className?: string;
  flex?: FlexType;
  [key: string]: unknown;
}

const Flex: React.FC<React.PropsWithChildren<IFlexProps>> = (
  {
    Tag = 'div',
    flex = 'none',
    justify = 'space-between',
    align,
    vertical = false,
    className,
    ...rest
  }: React.PropsWithChildren<IFlexProps>,
  ref: React.Ref<React.ElementType>,
) => {
  const classNames = cNs(
    styles.flex,
    styles[`flex-${flex}`],
    styles[`flex-justify-${justify}`],
    align && styles[`flex-align-${align}`],
    vertical ? styles['flex-direction-column'] : styles['flex-direction-row'],
    className,
  );

  return <Tag {...rest} ref={ref} className={classNames} />;
};

// @ts-ignore
// FIXME: typo
export default React.forwardRef(Flex) as typeof Flex;
