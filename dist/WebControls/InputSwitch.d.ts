import React from 'react';
interface IInputSwitchProps {
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    label: any;
    className?: string;
    id?: string;
    plainText?: boolean;
    changeValue?: (value: any, name?: string) => void;
}
export declare const InputSwitch: (props: IInputSwitchProps) => JSX.Element;
export {};
