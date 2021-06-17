import React from 'react';
export interface IIWCollapseProps extends React.HTMLProps<HTMLDivElement> {
    isOpen?: boolean;
    tag?: string | React.ReactType;
    navbar?: boolean;
}
export declare const Collapse: (props: IIWCollapseProps) => JSX.Element;
