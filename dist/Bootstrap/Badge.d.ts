import React from 'react';
export interface IWBadgeProps extends Omit<React.HTMLProps<HTMLSpanElement>, 'ref'> {
    color?: string;
    pill?: boolean;
    tag?: string | React.ReactType;
    className?: string;
}
export declare const Badge: (props: IWBadgeProps) => JSX.Element;
