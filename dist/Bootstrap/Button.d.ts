import React, { ReactNode } from 'react';
export interface IWButtonLightProps {
    color?: string;
    outline?: boolean;
    hidden?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
}
export interface IIWButtonProps extends IWButtonLightProps {
    tag?: string | React.ReactType;
    size?: 'sm' | 'lg';
    block?: boolean;
    type?: 'button' | 'submit' | 'reset';
    autoFocus?: boolean;
    tabIndex?: number;
    onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
    onKeyPress?: React.KeyboardEventHandler<HTMLButtonElement>;
    title?: string;
    classNameOverride?: string;
}
export declare const Button: React.ForwardRefExoticComponent<IIWButtonProps & React.RefAttributes<HTMLButtonElement>>;
