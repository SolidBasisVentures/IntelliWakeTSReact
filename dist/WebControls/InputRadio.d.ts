import React from 'react';
interface IProps {
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    value: any;
    label: any;
    className?: string;
    id?: string;
    plainText?: boolean;
    changeValue?: (value: any, name?: string) => void;
}
export declare const InputRadio: (props: IProps) => any;
export {};
