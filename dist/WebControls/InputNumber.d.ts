/// <reference types="react" />
import { IIWInputProps } from './IWInputProps';
export interface IPropsInputNumber<T = any, V = any> extends IIWInputProps<T, V> {
    htmlRef?: (ref: any) => void;
    decimalScale?: number | null;
    decimalScaleDisplay?: number | null;
    integerScale?: number | null;
    allowNegative?: boolean;
    lowerBound?: number;
    upperBound?: number;
    currency?: boolean;
    hideZero?: boolean;
}
export declare function InputNumber<T = any, V = any>(props: IPropsInputNumber<T, V>): JSX.Element;
