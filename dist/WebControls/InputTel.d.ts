/// <reference types="react" />
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IIWInputProps } from './IWInputProps';
interface IProps<T = unknown> extends IIWInputProps<T> {
    showFAIcon?: boolean | IconProp;
}
export declare function InputTel<T>(props: IProps<T>): JSX.Element;
export {};
