import React from 'react';
export interface IIWButtonProps {
    size?: 'sm' | 'lg';
    color?: string;
    outline?: boolean;
    hidden?: boolean;
    disabled?: boolean;
    block?: boolean;
    style?: React.CSSProperties;
    type?: 'button' | 'submit' | 'reset';
    autoFocus?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    tabIndex?: number;
    ref?: any;
    children?: any;
    onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
    onKeyPress?: React.KeyboardEventHandler<HTMLButtonElement>;
    title?: string;
}
export declare const IWButton: (props: IIWButtonProps) => JSX.Element;
