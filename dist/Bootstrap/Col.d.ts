import React from 'react';
import { IWColumnProps } from './ColProp';
export interface IIWColProps extends React.HTMLProps<HTMLDivElement> {
    xs?: IWColumnProps;
    sm?: IWColumnProps;
    md?: IWColumnProps;
    lg?: IWColumnProps;
    xl?: IWColumnProps;
}
export declare const Col: (props: IIWColProps) => JSX.Element;
