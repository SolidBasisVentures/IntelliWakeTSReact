import React from 'react';
export declare type IWColumnProps = string | boolean | number | {
    size?: boolean | number | string;
    offset?: string | number;
    order?: 'first' | 'last' | number;
};
export interface IIWColProps extends React.HTMLProps<HTMLDivElement> {
    xs?: IWColumnProps;
    sm?: IWColumnProps;
    md?: IWColumnProps;
    lg?: IWColumnProps;
    xl?: IWColumnProps;
}
export declare const Col: (props: IIWColProps) => JSX.Element;
