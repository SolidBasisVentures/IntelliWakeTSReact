/// <reference types="react" />
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IIWInputProps } from './IWInputProps';
interface IProps extends IIWInputProps {
    showFAIcon?: boolean | IconProp;
    changeValue?: (value: any, name?: string) => void;
}
export declare const InputTel: (props: IProps) => JSX.Element;
export {};
