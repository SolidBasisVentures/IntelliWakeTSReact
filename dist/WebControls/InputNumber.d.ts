import React, { ReactNode } from 'react';
import { TChangeValueFunction } from './IWInputProps';
export interface IPropsInputNumber<T = unknown> {
    name?: T extends object ? keyof T : string;
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
    changeValue?: TChangeValueFunction<T>;
    prepend?: ReactNode;
    append?: ReactNode;
}
export declare function InputNumber<T>(props: IPropsInputNumber<T>): JSX.Element;
