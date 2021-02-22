import { IIWInputProps } from './IWInputProps';
interface IProps<T = unknown> extends IIWInputProps<T> {
    autoCompleteOn?: boolean;
}
export declare function InputEmail<T>(props: IProps<T>): JSX.Element;
export {};
