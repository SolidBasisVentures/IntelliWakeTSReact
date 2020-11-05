import React from 'react';
import { TChangeValueFunction } from './IWInputProps';
interface IProps {
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    value: any;
    label: any;
    className?: string;
    id?: string;
    plainText?: boolean;
    changeValue?: TChangeValueFunction;
}
export declare const InputRadio: (props: IProps) => any;
export {};
