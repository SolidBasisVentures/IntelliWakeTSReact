import { IIWInputProps } from './IWInputProps';
interface IProps<T = unknown> extends IIWInputProps<T> {
    bordered?: boolean;
    rows?: number;
}
export declare function InputTextArea<T>(props: IProps<T>): JSX.Element;
export {};
