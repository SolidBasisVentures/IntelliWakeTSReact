import { ReactElement, ReactNode } from 'react';
import { IIWInputAddProps, IIWInputProps } from './IWInputProps';
interface IProps<T> extends IIWInputAddProps<T> {
    children: ReactElement<IIWInputProps<T>>;
    className?: string;
    inputIsValid?: (value: any) => boolean;
    valueOnInvalid?: (value: any) => any;
    transformToValid?: (value: any) => any;
    doNotSelectOnFocus?: boolean;
    plainTextControl?: ReactNode;
    lateDelayMS?: number;
}
export declare const InputWrapper: <T>(props: IProps<T>) => JSX.Element;
export {};
