import React from 'react';
export interface IWCardFooterProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tag?: string | React.ReactType;
}
export declare const CardFooter: (props: IWCardFooterProps) => JSX.Element;
