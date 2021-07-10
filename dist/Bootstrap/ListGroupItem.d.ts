import React, { ReactNode } from 'react';
/**
 * null shows spinner
 * !value removes the badge
 * !!value shows the badge
 */
export declare type TBadgeValues = null | string | number | ReactNode | boolean;
export interface IWListGroupItemProps extends Omit<React.HTMLProps<HTMLLIElement>, 'ref' | 'action' | 'onClick'> {
    tag?: string | React.ReactType;
    active?: boolean;
    disabled?: boolean;
    color?: string;
    action?: boolean;
    href?: string;
    className?: string;
    onClick?: React.MouseEventHandler<any>;
    badge?: TBadgeValues;
    badgeColor?: string;
    badgeClass?: string;
}
export declare const ListGroupItem: (props: IWListGroupItemProps) => JSX.Element;
