import React from 'react';
export interface IIWRowProps extends React.HTMLProps<HTMLDivElement> {
    noGutters?: boolean;
    className?: string;
    children?: any;
}
export declare const Row: (props: IIWRowProps) => JSX.Element;
