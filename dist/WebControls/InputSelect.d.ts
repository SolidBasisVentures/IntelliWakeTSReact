import React from 'react';
export interface IPropsSelect {
    name?: string;
    value: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    innerRef?: (ref: any) => void;
    className?: string;
    style?: any;
    children?: any;
    isNumeric?: boolean;
    isNumericOrNull?: boolean;
    isStringOrNull?: boolean;
    id?: string;
    plainText?: boolean;
    plainTextURL?: string;
    plainOnClick?: () => void;
    invalid?: boolean;
    changeValue?: (value: any, name?: string) => void;
}
export declare const InputSelect: (props: IPropsSelect) => JSX.Element;
