/// <reference types="react" />
import { IIWInputProps } from './IWInputProps';
export interface IPropsSelect<T = any, V = any> extends IIWInputProps<T, V> {
    innerRef?: (ref: any) => void;
    children?: any;
    isNumeric?: boolean;
    isNumericOrNull?: boolean;
    isStringOrNull?: boolean;
    plainOnClick?: () => void;
    multiple?: boolean;
    required?: boolean;
}
export declare function InputSelect<T>(props: IPropsSelect<T>): JSX.Element;
