import { InputProps } from 'reactstrap';
import React from 'react';
export declare type TChangeValueFunction<T = unknown> = (value: any, name?: T extends object ? keyof T : string, shiftKey?: boolean, ctrlKey?: boolean, altKey?: boolean) => void;
export interface IIWInputProps<T = unknown> extends InputProps {
    plainText?: boolean;
    plainTextURL?: string;
    plainTextProps?: any;
    changeValue?: TChangeValueFunction<T>;
}
export declare const ReduceInputProps: (props: IIWInputProps) => InputProps;
export declare const HandleChangeValue: <T>(e: React.ChangeEvent<HTMLInputElement>, changeValue?: TChangeValueFunction<T> | undefined, onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined) => void;
