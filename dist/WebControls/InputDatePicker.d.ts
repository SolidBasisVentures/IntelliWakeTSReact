/// <reference types="react" />
interface IProps {
    value: string;
    name?: string;
    placeholder?: string;
    plainText?: boolean;
    plainTextURL?: string;
    plainTextProps?: any;
    changeValue?: (value: any, name?: string) => void;
    showTime?: boolean;
    noTodayButton?: boolean;
}
export declare const InputDatePicker: (props: IProps) => JSX.Element;
export {};
