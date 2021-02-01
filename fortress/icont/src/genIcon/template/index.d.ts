/* eslint-disable */
// @ts-nocheck
import React from './react';
import IconType from './map';

export * from './map';

export interface IIconProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  type: IconType;
}

declare const _default: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<IIconProps> & React.RefAttributes<HTMLElement>
>;

export default _default;
