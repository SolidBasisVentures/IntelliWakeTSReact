/// <reference types="react" />
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IIWInputProps, TChangeValueFunction } from './IWInputProps';
interface IProps extends IIWInputProps {
    showFAIcon?: boolean | IconProp;
    changeValue?: TChangeValueFunction;
    autoCompleteOn?: boolean;
}
export declare const InputTel: (props: IProps) => JSX.Element;
export {};
