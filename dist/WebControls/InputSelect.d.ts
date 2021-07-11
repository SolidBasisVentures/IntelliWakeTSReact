import { IIWInputProps } from './IWInputProps';
export interface IPropsSelect<T = any, V = any, H = HTMLSelectElement> extends IIWInputProps<T, V, H> {
    innerRef?: (ref: any) => void;
    children?: any;
    isNumeric?: boolean;
    isNumericOrNull?: boolean;
    isStringOrNull?: boolean;
    plainOnClick?: () => void;
    multiple?: boolean;
    required?: boolean;
}
export declare function InputSelect<T, V>(props: IPropsSelect<T, V>): JSX.Element;
