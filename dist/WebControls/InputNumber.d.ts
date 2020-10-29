import React from 'react';
export interface IPropsInputNumber {
    name?: string;
    value: number | null;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    htmlRef?: (ref: any) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    decimalScale?: number | null;
    integerScale?: number | null;
    allowNegative?: boolean;
    lowerBound?: number;
    upperBound?: number;
    currency?: boolean;
    required?: boolean;
    placeholder?: string;
    autoCompleteOn?: boolean;
    autoFocus?: boolean;
    className?: string;
    style?: any;
    id?: string;
    hideZero?: boolean;
    plainText?: boolean;
    plainTextProps?: any;
    invalid?: boolean;
    changeValue?: (value: any, name?: string) => void;
}
export declare const InputNumber: (props: IPropsInputNumber) => JSX.Element;
