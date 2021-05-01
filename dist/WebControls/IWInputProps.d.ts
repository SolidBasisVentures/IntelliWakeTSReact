import { InputProps } from 'reactstrap';
import React, { ReactNode } from 'react';
export declare type TChangeValueFunction<T = unknown> = (value: any, name?: T extends object ? keyof T : string, shiftKey?: boolean, ctrlKey?: boolean, altKey?: boolean) => void;
export interface IIWInputAddProps<T = unknown> {
    plainText?: boolean;
    plainTextURL?: string;
    plainTextProps?: any;
    changeValue?: TChangeValueFunction<T>;
    changeValueLate?: TChangeValueFunction<T>;
    autoCompleteOn?: boolean;
    prepend?: ReactNode;
    append?: ReactNode;
}
export interface IIWInputProps<T = unknown> extends InputProps, IIWInputAddProps<T> {
}
export declare const ReduceInputProps: (props: IIWInputProps | any) => InputProps;
export declare const ReduceToInputAddProps: (props: IIWInputProps | any) => IIWInputAddProps;
export declare const HandleChangeValue: <T>(e: React.ChangeEvent<HTMLInputElement>, changeValue?: TChangeValueFunction<T> | undefined, onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined) => void;
