/// <reference types="react" />
import { Moment } from 'moment';
export declare const customRangeName = "Custom Range";
export interface IDateRangeString {
    name: string;
    start: string;
    end: string;
}
export declare const DateRangeDateMomentToString: (date: Moment | string) => string;
export declare const DateRangeDateStringToMoment: (date: Moment | string) => Moment;
export declare const DateRangeToMoment: (dateRange: IDateRange | IDateRangeString) => IDateRange;
export declare const DateRangeToString: (dateRange: IDateRange | IDateRangeString) => IDateRangeString;
export interface IDateRange {
    name: string;
    start: Moment;
    end: Moment;
}
export declare const initialDateRange: IDateRange;
export declare const initialDateRangeString: IDateRangeString;
interface IPropsCalendar {
    month: Moment;
    startSelected: Moment;
    endSelected: Moment;
    dateClick: ((date: Moment) => void);
    prevMonth?: Function;
    nextMonth?: Function;
}
export declare const DateRangeCalendar: (props: IPropsCalendar) => JSX.Element;
export interface IPropsDateRange {
    selectRange?: ((range: IDateRange) => void);
    selectRangeString?: ((range: IDateRangeString) => void);
    presetRanges?: (IDateRange | IDateRangeString)[];
    defaultRange?: IDateRange | IDateRangeString;
    showCaret?: boolean;
    faIcon?: any | undefined | null;
    borderless?: boolean;
    color?: string;
    className?: string;
}
export declare const DateRange: (props: IPropsDateRange) => JSX.Element;
export declare const defaultRanges: IDateRange[];
export declare const defaultRangeStrings: IDateRangeString[];
export declare const defaultRangesReport: IDateRange[];
export declare const defaultRangeStringsReport: IDateRangeString[];
export declare const defaultRange: IDateRange;
export declare const defaultRangeString: IDateRangeString;
export {};
