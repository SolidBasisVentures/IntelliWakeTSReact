import React, { ReactNode } from 'react';
import { TClassNames } from '../Functions';
export declare type TChangeValueFunction<T = any, V = any> = (value: V, name?: T extends object ? keyof T : string, shiftKey?: boolean, ctrlKey?: boolean, altKey?: boolean) => void;
export interface IIWInputAddProps<T = any, V = any> {
    plainText?: boolean;
    plainTextURL?: string;
    plainTextProps?: any;
    plainOnClick?: () => void;
    changeValue?: TChangeValueFunction<T, V>;
    changeValueLate?: TChangeValueFunction<T, V>;
    autoCompleteOn?: boolean;
    prepend?: ReactNode;
    append?: ReactNode;
}
export declare type THTMLChangeElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export declare type TLegacyInputType = 'text' | 'email' | 'select' | 'file' | 'radio' | 'checkbox' | 'textarea' | 'button' | 'reset' | 'submit' | 'date' | 'datetime-local' | 'hidden' | 'image' | 'month' | 'number' | 'range' | 'search' | 'tel' | 'url' | 'week' | 'password' | 'datetime' | 'time' | 'color';
export interface ILegacyInputProps<T = THTMLChangeElements> extends React.InputHTMLAttributes<T> {
    [key: string]: any;
    type?: TLegacyInputType;
    bsSize?: 'lg' | 'sm';
    valid?: boolean;
    invalid?: boolean;
    tag?: React.ElementType;
    innerRef?: React.Ref<T>;
    plaintext?: boolean;
    addon?: boolean;
}
export interface IIWInputProps<T = any, V = any, H = THTMLChangeElements> extends Omit<ILegacyInputProps<H>, 'value'>, IIWInputAddProps<T, V> {
    value?: V;
}
export declare const ReduceInputProps: <T = any, V = any, H = THTMLChangeElements>(props: any, classNameAdd?: string | TClassNames | string[] | undefined) => ILegacyInputProps;
export declare const ReduceToInputAddProps: <T = any, V = any>(props: any) => IIWInputAddProps<T, V>;
export declare const HandleChangeValue: <T = any, V = any, H = any>(e: React.ChangeEvent<H>, changeValue?: TChangeValueFunction<T, V> | undefined, onChange?: ((e: React.ChangeEvent<H>) => void) | undefined) => void;
