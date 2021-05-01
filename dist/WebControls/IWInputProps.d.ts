import { InputProps } from 'reactstrap';
import React, { ReactNode } from 'react';
export declare type TChangeValueFunction<T = unknown, V = any> = (value: V, name?: T extends object ? keyof T : string, shiftKey?: boolean, ctrlKey?: boolean, altKey?: boolean) => void;
export interface IIWInputAddProps<T = unknown, V = any> {
    plainText?: boolean;
    plainTextURL?: string;
    plainTextProps?: any;
    changeValue?: TChangeValueFunction<T, V>;
    changeValueLate?: TChangeValueFunction<T, V>;
    autoCompleteOn?: boolean;
    prepend?: ReactNode;
    append?: ReactNode;
}
export interface IIWInputProps<T = unknown, V = any> extends InputProps, IIWInputAddProps<T, V> {
}
export declare const ReduceInputProps: <T = unknown, V = any>(props: any) => InputProps;
export declare const ReduceToInputAddProps: <T = unknown, V = any>(props: any) => IIWInputAddProps<T, V>;
export declare const HandleChangeValue: <T, V>(e: React.ChangeEvent<HTMLInputElement>, changeValue?: TChangeValueFunction<T, V> | undefined, onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined) => void;
