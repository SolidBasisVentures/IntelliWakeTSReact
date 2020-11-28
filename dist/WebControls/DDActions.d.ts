import { ReactNode } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export interface IDDAction {
    hidden?: boolean;
    divider?: boolean;
    disabled?: boolean;
    header?: boolean;
    faProp?: FontAwesomeIconProps;
    title?: ReactNode;
    action?: () => void;
}
export interface IPropsDDActions {
    ddActions: IDDAction[];
    hidden?: boolean;
    noCaret?: boolean;
    buttonText?: ReactNode;
    faProps?: FontAwesomeIconProps | null;
    className?: string;
    color?: string;
    right?: boolean;
    size?: string;
}
/**
 * An array-driven drop down control
 */
export declare const DDActions: (props: IPropsDDActions) => JSX.Element | null;
