import React, { ReactNode } from 'react';
export interface IWListGroupItemProps extends Omit<React.HTMLProps<HTMLLIElement>, 'ref' | 'action' | 'onClick'> {
    tag?: string | React.ReactType;
    active?: boolean;
    disabled?: boolean;
    color?: string;
    action?: boolean;
    href?: string;
    className?: string;
    onClick?: React.MouseEventHandler<any>;
    badge?: null | string | number | ReactNode | boolean;
    badgeColor?: string;
    badgeNotSmall?: boolean;
}
export declare const ListGroupItem: (props: IWListGroupItemProps) => JSX.Element;
