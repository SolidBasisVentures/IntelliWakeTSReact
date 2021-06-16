import React, { CSSProperties, ReactNode } from 'react';
export interface IWModalProps {
    isOpen?: boolean;
    autoFocus?: boolean;
    size?: 'sm' | 'lg';
    toggle?: React.KeyboardEventHandler<any> | React.MouseEventHandler<any>;
    color?: string;
    title?: ReactNode;
    body?: ReactNode;
    bodyStyle?: CSSProperties;
    noCancel?: boolean;
    cancelLabel?: ReactNode;
    noCancelButton?: boolean;
    okAction?: () => void | false;
    okLabel?: ReactNode;
    okDisabled?: boolean;
    footerLeft?: ReactNode;
    footerRight?: ReactNode;
}
export declare const Modal: (props: IWModalProps) => JSX.Element;
