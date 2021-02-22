import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IIWInputProps, TChangeValueFunction } from './IWInputProps';
interface IProps<T = unknown> extends IIWInputProps<T> {
    showFAIcon?: boolean | IconProp;
    changeValue?: TChangeValueFunction<T>;
    autoCompleteOn?: boolean;
}
export declare function InputTel<T>(props: IProps<T>): JSX.Element;
export {};
