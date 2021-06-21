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
    children?: any;
    onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
    onKeyPress?: React.KeyboardEventHandler<HTMLButtonElement>;
    title?: string;
    classNameOverride?: string;
}
export declare const Button: React.ForwardRefExoticComponent<IIWButtonProps & React.RefAttributes<HTMLButtonElement>>;
