/// <reference types="react" />
import { IArrayStructure } from './ArrayStructure';
export interface IPropsArrayTable {
    arrayData: any[] | null;
    arrayStructure: IArrayStructure;
    bordered?: boolean;
    scrollable?: boolean;
    minWidth?: string;
    hideCosts?: boolean;
}
export declare const ArrayTable: (props: IPropsArrayTable) => JSX.Element;
