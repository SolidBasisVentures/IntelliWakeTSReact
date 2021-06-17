import React from 'react';
export interface IIWNavbarProps extends React.HTMLProps<HTMLBaseElement> {
    light?: boolean;
    dark?: boolean;
    fixed?: string;
    sticky?: string;
    color?: string;
    role?: string;
    tag?: string | React.ReactType;
    expand?: boolean | string;
}
export declare const Navbar: (props: IIWNavbarProps) => JSX.Element;
