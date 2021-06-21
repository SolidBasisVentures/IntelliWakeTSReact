import React from 'react';
export interface IWCardBodyProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tag?: string | React.ReactType;
    className?: string;
}
export declare const CardBody: (props: IWCardBodyProps) => JSX.Element;
