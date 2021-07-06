import React, { CSSProperties, ReactNode } from 'react';
import { IWButtonLightProps } from './Button';
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
    bodyContainerFormSubmit?: boolean | string;
    noCancel?: boolean;
    cancelLabel?: ReactNode;
    noCancelButton?: boolean;
    okAction?: () => void | false;
    okLabel?: ReactNode;
    okDisabled?: boolean;
    footerLeft?: ReactNode;
    footerRight?: ReactNode;
    leftButtons?: IWButtonLightProps[];
    rightButtons?: IWButtonLightProps[];
    children?: any;
}
export declare const Modal: (props: IWModalProps) => JSX.Element;
