import { IIWInputProps } from './IWInputProps';
interface IProps<T = unknown> extends IIWInputProps<T> {
    includeDate?: boolean;
    editSeconds?: boolean;
}
export declare function InputTime<T>(props: IProps<T>): JSX.Element;
export {};
