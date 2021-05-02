import { IIWInputProps } from './IWInputProps';
interface IProps<T = unknown> extends IIWInputProps<T> {
    plainTextLast4Only?: boolean;
}
export declare function InputSSN<T>(props: IProps<T>): JSX.Element;
export {};
