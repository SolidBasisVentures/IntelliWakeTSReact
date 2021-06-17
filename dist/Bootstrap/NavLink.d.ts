import React from 'react';
export interface IWNavLinkProps extends React.HTMLProps<HTMLAnchorElement> {
    tag?: string | React.ReactType;
}
export declare const NavLink: (props: IWNavLinkProps) => JSX.Element;
