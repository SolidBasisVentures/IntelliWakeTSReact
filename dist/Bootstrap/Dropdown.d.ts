import React, { ReactNode } from 'react';
export declare type Direction = 'up' | 'down' | 'left' | 'right';
export interface IWDropdownProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref' | 'size'> {
    disabled?: boolean;
    direction?: Direction;
    isOpen?: boolean;
    nav?: boolean;
    tag?: string | React.ReactType;
    toggle?: React.KeyboardEventHandler<any> | React.MouseEventHandler<any>;
    size?: 'sm' | 'lg';
    color?: string;
    inNavbar?: boolean;
    right?: boolean;
    toggleButtonLabel: ReactNode;
    toggleButtonClassName?: string;
    menuClassName?: string;
}
export declare const Dropdown: (props: IWDropdownProps) => JSX.Element;
