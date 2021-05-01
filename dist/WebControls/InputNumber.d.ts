import { IIWInputProps } from './IWInputProps';
export interface IPropsInputNumber<T = unknown> extends IIWInputProps<T> {
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
export declare function InputNumber<T>(props: IPropsInputNumber<T>): JSX.Element;
