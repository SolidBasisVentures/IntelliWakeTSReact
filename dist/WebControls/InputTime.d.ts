import { IIWInputProps } from './IWInputProps';
interface IProps extends IIWInputProps {
    includeDate?: boolean;
    editSeconds?: boolean;
}
export declare const InputTime: (props: IProps) => JSX.Element;
export {};
