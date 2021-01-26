import React from 'react';
export declare type Flex = '0' | '1' | 'auto' | 'none';
interface FlexItemProps {
    Tag?: React.ElementType;
    flex?: Flex;
    className?: string;
    [key: string]: unknown;
}
declare const _default: React.FC<React.PropsWithChildren<FlexItemProps>>;
export default _default;
