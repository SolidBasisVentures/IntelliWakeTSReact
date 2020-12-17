/// <reference types="react" />
import { IIWInputProps } from './IWInputProps';
interface IProps extends IIWInputProps {
    showTime?: boolean;
    autoCompleteOn?: boolean;
}
export declare const InputDate: (props: IProps) => JSX.Element;
export {};
