import { IIWInputProps } from './IWInputProps';
export interface IZipProps<T = unknown> extends IIWInputProps<T> {
    withNine?: boolean;
    autoCompleteOn?: boolean;
}
export declare function InputZip<T>(props: IZipProps<T>): JSX.Element;
