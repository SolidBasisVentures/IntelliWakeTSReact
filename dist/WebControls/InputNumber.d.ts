import { IIWInputProps } from './IWInputProps';
export interface IPropsInputNumber<T = unknown> extends Omit<IIWInputProps<T>, 'value'> {
    value: number | null;
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
