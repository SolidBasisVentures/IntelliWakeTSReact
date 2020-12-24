import { IIWInputProps } from './IWInputProps';
interface IProps extends IIWInputProps {
    plainTextLast4Only?: boolean;
    autoCompleteOn?: boolean;
}
export declare const InputSSN: (props: IProps) => JSX.Element;
export {};
