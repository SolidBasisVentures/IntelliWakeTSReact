import React from 'react';
import { IWColumnProps } from './ColProp';
export interface IIWLabelProps extends React.HTMLProps<HTMLLabelElement> {
    xs?: IWColumnProps;
    sm?: IWColumnProps;
    md?: IWColumnProps;
    lg?: IWColumnProps;
    xl?: IWColumnProps;
    hidden?: boolean;
    check?: boolean;
    disabled?: boolean;
    for?: string;
    tag?: string | React.ReactType;
}
export declare const Label: (props: IIWLabelProps) => JSX.Element;
