import { IIWInputProps } from './IWInputProps';
export interface IPropsInputNumber<T = any, V = number | null> extends IIWInputProps<T, V> {
    htmlRef?: (ref: any) => void;
    decimalScale?: number | null;
    integerScale?: number | null;
    allowNegative?: boolean;
    lowerBound?: number;
    upperBound?: number;
    currency?: boolean;
    required?: boolean;
    hideZero?: boolean;
}
export declare function InputNumber<T = any, V = number | null>(props: IPropsInputNumber<T, V>): JSX.Element;
