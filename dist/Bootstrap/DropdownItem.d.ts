import React from 'react';
export interface IWDropdownItemProps extends Omit<React.HTMLProps<HTMLBaseElement>, 'ref'> {
    disabled?: boolean;
    tag?: string | React.ReactType;
    href?: string;
    divider?: boolean;
    header?: boolean;
}
export declare const DropdownItem: (props: IWDropdownItemProps) => JSX.Element;
