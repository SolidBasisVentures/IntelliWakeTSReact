import React from 'react';
export interface IWCardColumnsProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tag?: string | React.ReactType;
}
export declare const CardColumns: (props: IWCardColumnsProps) => JSX.Element;
