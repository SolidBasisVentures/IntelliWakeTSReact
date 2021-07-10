import React from 'react';
export interface IWCardGroupProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tag?: string | React.ReactType;
}
export declare const CardGroup: (props: IWCardGroupProps) => JSX.Element;
