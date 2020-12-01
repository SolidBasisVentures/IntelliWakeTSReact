import React from 'react';
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
    autoFocus?: boolean;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
    noSelectOnFocus?: boolean;
}
/**
 * A search input with an option to have a trigger delay or not.
 */
export declare const InputSearch: (props: IPropsInputSearch) => JSX.Element;
