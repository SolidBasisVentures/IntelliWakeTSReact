import { InputProps } from 'reactstrap';
import React from 'react';
export declare type TChangeValueFunction = (value: any, name?: string) => void;
export interface IIWInputProps extends InputProps {
    plainText?: boolean;
    plainTextURL?: string;
    plainTextProps?: any;
    changeValue?: TChangeValueFunction;
}
export declare const reduceInputProps: (props: IIWInputProps) => InputProps;
export declare const handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>, changeValue?: ((value: any, name: string) => void) | undefined, onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined) => void;
