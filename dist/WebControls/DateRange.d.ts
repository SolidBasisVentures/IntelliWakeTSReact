/// <reference types="react" />
import { Moment } from 'moment';
export declare const customRangeName = "Custom Range";
export interface IDateRange {
    name: string;
    start: Moment;
    end: Moment;
}
export declare const initialDateRange: IDateRange;
interface IPropsCalendar {
    month: Moment;
    startSelected: Moment;
    endSelected: Moment;
    dateClick: ((date: Moment) => void);
    prevMonth?: Function;
    nextMonth?: Function;
}
export declare const DateRangeCalendar: (props: IPropsCalendar) => JSX.Element;
export {};
