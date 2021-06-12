/// <reference types="react" />
import { IIWInputProps } from './IWInputProps';
interface IProps<T = any, V = any> extends IIWInputProps<T, V> {
    autoCompleteOn?: boolean;
    plainTextLabel?: string | null;
}
export declare function InputEmail<T = any, V = any>(props: IProps<T, V>): JSX.Element;
export {};
