import React from 'react';
import { Flex as FlexType } from './FlexItem';
export declare type Justify = 'center' | 'space-between' | 'space-around' | 'flex-start' | 'flex-end';
export declare type Align = Justify;
interface FlexProps {
    Tag?: React.ElementType;
    justify?: Justify;
    align?: Align;
    vertical?: boolean;
    className?: string;
    flex?: FlexType;
    [key: string]: unknown;
}
declare const _default: React.FC<React.PropsWithChildren<FlexProps>>;
export default _default;
