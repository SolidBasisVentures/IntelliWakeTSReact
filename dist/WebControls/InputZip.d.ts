/// <reference types="react" />
import { IIWInputProps } from './IWInputProps';
export interface IZipProps extends IIWInputProps {
    withNine?: boolean;
    autoCompleteOn?: boolean;
}
export declare const InputZip: (props: IZipProps) => JSX.Element;
