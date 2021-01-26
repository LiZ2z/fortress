// @ts-nocheck
// FIXME: typo
import React from 'react';
import cNs from './classNames';
import { Flex as FlexType } from './FlexItem';
import styles from './style.m.scss';

export type Justify =
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'flex-start'
  | 'flex-end';

export type Align = Justify;

interface FlexProps {
  Tag?: React.ElementType;
  justify?: Justify;
  align?: Align;
  vertical?: boolean;
  className?: string;
  flex?: FlexType;
  [key: string]: unknown;
}

const Flex: React.FC<React.PropsWithChildren<FlexProps>> = (
  {
    Tag = 'div',
    flex = 'none',
    justify = 'space-between',
    align,
    vertical = false,
    className,
    ...rest
  }: React.PropsWithChildren<FlexProps>,
  ref: React.Ref<React.ElementType>
) => {
  const classNames = cNs(
    styles.flex,
    styles[`flex-${flex}`],
    styles[`flex-justify-${justify}`],
    align && styles[`flex-align-${align}`],
    vertical && styles['flex-direction-column'],
    className
  );

  return <Tag {...rest} ref={ref} className={classNames} />;
};

export default React.forwardRef(Flex) as typeof Flex;
