import React from 'react';
export interface IWBadgeProps extends Omit<React.HTMLProps<HTMLSpanElement>, 'ref'> {
    color?: string;
    notPill?: boolean;
    tag?: string | React.ReactType;
}
export declare const Badge: (props: IWBadgeProps) => JSX.Element;
