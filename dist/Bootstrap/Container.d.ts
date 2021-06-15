import React from 'react';
export interface IIWContainerProps extends React.HTMLProps<HTMLDivElement> {
    fluid?: boolean | string;
    className?: string;
    children?: any;
}
export declare const Container: (props: IIWContainerProps) => JSX.Element;
