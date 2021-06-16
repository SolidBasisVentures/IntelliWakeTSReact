import React, { CSSProperties, ReactNode } from 'react';
export interface IWModalProps {
    isOpen?: boolean;
    autoFocusElement?: any;
    size?: 'sm' | 'lg';
    toggle?: React.KeyboardEventHandler<any> | React.MouseEventHandler<any>;
    color?: string;
    title?: ReactNode;
    body?: ReactNode;
    dialogStyle?: CSSProperties;
    dialogClassName?: string;
    bodyStyle?: CSSProperties;
    bodyClassName?: string;
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
