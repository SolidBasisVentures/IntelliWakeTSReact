import React from 'react';
import { TChangeValueFunction } from './IWInputProps';
export interface IInputSwitchProps<T = unknown> {
    name?: T extends object ? keyof T : string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    label: any;
    className?: string;
    id?: string;
    plainText?: boolean;
    changeValue?: TChangeValueFunction<T>;
    hidden?: boolean;
}
export declare function InputSwitch<T>(props: IInputSwitchProps<T>): JSX.Element;
