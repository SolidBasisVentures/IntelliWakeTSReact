import React, { ReactNode } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export interface IPropsInputSearch {
    initialValue?: string;
    triggerSearchText: (value: string) => void;
    triggerDelayAmount?: number;
    triggerOnEnter?: boolean;
    innerRef?: (ref: any) => void;
    className?: string;
    style?: any;
    placeholder?: string;
    id?: string;
    bordered?: boolean;
    iconPrefix?: boolean | FontAwesomeIconProps;
    reactPrefix?: ReactNode;
    inputGroupClass?: string;
    size?: 'lg' | 'sm';
    autoFocus?: boolean;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
    noSelectOnFocus?: boolean;
    autoCompleteOn?: boolean;
}
/**
 * A search input with an option to have a trigger delay or not.
 */
export declare const InputSearch: (props: IPropsInputSearch) => JSX.Element;
