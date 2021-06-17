import React from 'react';
export interface IIWNavProps extends React.HTMLProps<HTMLUListElement> {
    tabs?: boolean;
    pills?: boolean;
    vertical?: boolean | string;
    horizontal?: string;
    justified?: boolean;
    fill?: boolean;
    navbar?: boolean;
    card?: boolean;
    tag?: string | React.ReactType;
    className?: string;
}
export declare const Nav: (props: IIWNavProps) => JSX.Element;
