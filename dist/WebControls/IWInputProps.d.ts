import { InputProps } from 'reactstrap';
import React, { ReactNode } from 'react';
export declare type TChangeValueFunction<T = any, V = any> = (value: V, name?: T extends object ? keyof T : string, shiftKey?: boolean, ctrlKey?: boolean, altKey?: boolean) => void;
export interface IIWInputAddProps<T = any, V = any> {
    plainText?: boolean;
    plainTextURL?: string;
    plainTextProps?: any;
    changeValue?: TChangeValueFunction<T, V>;
    changeValueLate?: TChangeValueFunction<T, V>;
    autoCompleteOn?: boolean;
    prepend?: ReactNode;
    append?: ReactNode;
}
export interface IIWInputProps<T = any, V = any> extends InputProps, IIWInputAddProps<T, V> {
}
export declare const ReduceInputProps: <T = any, V = any>(props: any) => InputProps;
export declare const ReduceToInputAddProps: <T = any, V = any>(props: any) => IIWInputAddProps<T, V>;
export declare const HandleChangeValue: <T = any, V = any>(e: React.ChangeEvent<HTMLInputElement>, changeValue?: TChangeValueFunction<T, V> | undefined, onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined) => void;
