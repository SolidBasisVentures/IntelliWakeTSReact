import { ReactNode } from 'react';
import { TChangeValueFunction } from './IWInputProps';
export interface IOption {
    key: any;
    description: ReactNode;
}
export declare const OptionsActive: {
    key: boolean;
    description: string;
}[];
export declare const OptionsActiveAll: ({
    key: boolean;
    description: string;
} | {
    key: null;
    description: string;
})[];
interface IProps {
    className?: string;
    borderless?: boolean;
    inline?: boolean;
    color?: string;
    options: IOption[];
    value: any;
    name?: string;
    changeValue?: TChangeValueFunction;
    plainText?: boolean;
}
export declare const InputSelectStep: (props: IProps) => JSX.Element;
export {};
