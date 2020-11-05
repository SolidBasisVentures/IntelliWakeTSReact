/// <reference types="react" />
import { TChangeValueFunction } from './IWInputProps';
interface IProps {
    value: string;
    name?: string;
    placeholder?: string;
    plainText?: boolean;
    plainTextURL?: string;
    plainTextProps?: any;
    changeValue?: TChangeValueFunction;
    showTime?: boolean;
    noTodayButton?: boolean;
}
export declare const InputDatePicker: (props: IProps) => JSX.Element;
export {};
