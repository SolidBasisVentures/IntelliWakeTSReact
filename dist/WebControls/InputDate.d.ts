/// <reference types="react" />
import { IIWInputProps } from './IWInputProps';
interface IProps<T = unknown> extends IIWInputProps<T> {
    showTime?: boolean;
}
export declare function InputDate<T>(props: IProps<T>): JSX.Element;
export {};
