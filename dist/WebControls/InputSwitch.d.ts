import React from 'react';
import { TChangeValueFunction } from './IWInputProps';
export interface IInputSwitchProps {
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    label: any;
    className?: string;
    id?: string;
    plainText?: boolean;
    changeValue?: TChangeValueFunction;
}
export declare const InputSwitch: (props: IInputSwitchProps) => JSX.Element;
