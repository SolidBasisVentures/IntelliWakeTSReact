import React from 'react';
export interface IWCardProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tag?: string | React.ReactType;
    className?: string;
}
export declare const Card: (props: IWCardProps) => JSX.Element;
