import React from 'react';
export interface IWCardTextProps extends Omit<React.HTMLProps<HTMLParagraphElement>, 'ref'> {
    tag?: string | React.ReactType;
    className?: string;
}
export declare const CardText: (props: IWCardTextProps) => JSX.Element;
