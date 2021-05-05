import { ReactElement, ReactNode } from 'react';
import { IIWInputAddProps, IIWInputProps } from './IWInputProps';
interface IProps<T = any, V = any> extends IIWInputAddProps<T, V> {
    children: ReactElement<IIWInputProps<T, V>>;
    className?: string;
    inputIsValid?: (value: any) => boolean;
    valueOnInvalid?: (value: any) => any;
    transformToValid?: (value: any) => any;
    doNotSelectOnFocus?: boolean;
    plainTextControl?: ReactNode;
    isInvalid?: boolean;
    lateDelayMS?: number;
    isEqual?: (internalValue: any, endValue: any) => boolean;
    consoleVerbose?: boolean;
}
export declare const InputWrapper: <T, V>(props: IProps<T, V>) => JSX.Element;
export {};
