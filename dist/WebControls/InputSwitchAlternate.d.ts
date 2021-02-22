import React from 'react';
import { TChangeValueFunction } from './IWInputProps';
interface IInputSwitchAlternateProps<T = unknown> {
    name?: T extends object ? keyof T : string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string | number | boolean;
    label: any;
    valuesOnOff?: [string | number | boolean, string | number | boolean];
    className?: string;
    id?: string;
    plainText?: boolean;
    changeValue?: TChangeValueFunction<T>;
}
export declare const InputSwitchAlternate: (props: IInputSwitchAlternateProps) => JSX.Element;
export {};
