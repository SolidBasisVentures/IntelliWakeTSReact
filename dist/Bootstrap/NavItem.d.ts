import React from 'react';
export interface IWNavItemProps extends React.HTMLProps<HTMLLIElement> {
    tag?: string | React.ReactType;
}
export declare const NavItem: (props: IWNavItemProps) => JSX.Element;
