import { TChangeValueFunction } from './IWInputProps';
interface IProps<T = unknown> {
    value: string;
    name?: T extends object ? keyof T : string;
    placeholder?: string;
    plainText?: boolean;
    plainTextURL?: string;
    plainTextProps?: any;
    changeValue?: TChangeValueFunction<T>;
    showTime?: boolean;
    noTodayButton?: boolean;
}
/**
 * A react datetime picker wrapper. Can also be used as a plain text to display the date/time values.
 */
export declare function InputDatePicker<T>(props: IProps<T>): JSX.Element;
export {};
