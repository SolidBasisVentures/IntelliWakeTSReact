import React from 'react';
import { TChangeValueFunction } from './IWInputProps';
interface IProps<T = unknown> {
    name?: T extends object ? keyof T : string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    value: any;
    label: any;
    className?: string;
    id?: string;
    plainText?: boolean;
    changeValue?: TChangeValueFunction<T>;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}
export declare function InputRadio<T>(props: IProps<T>): any;
export {};
