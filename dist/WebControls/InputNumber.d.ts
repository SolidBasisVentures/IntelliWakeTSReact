import { IIWInputProps } from './IWInputProps';
export interface IPropsInputNumber<T = unknown> extends IIWInputProps<T> {
    decimalScale?: number | null;
    integerScale?: number | null;
    allowNegative?: boolean;
    lowerBound?: number;
    upperBound?: number;
    currency?: boolean;
    required?: boolean;
    hideZero?: boolean;
}
export declare function InputNumber<T>(props: IPropsInputNumber<T>): JSX.Element;
