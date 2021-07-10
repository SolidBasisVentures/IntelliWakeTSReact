import React from 'react';
export interface IWCardHeaderProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tag?: string | React.ReactType;
}
export declare const CardHeader: (props: IWCardHeaderProps) => JSX.Element;
