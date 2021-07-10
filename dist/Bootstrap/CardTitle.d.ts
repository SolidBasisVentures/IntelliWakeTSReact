import React from 'react';
export interface IWCardTitleProps extends Omit<React.HTMLProps<HTMLHeadElement>, 'ref'> {
    tag?: string | React.ReactType;
}
export declare const CardTitle: (props: IWCardTitleProps) => JSX.Element;
