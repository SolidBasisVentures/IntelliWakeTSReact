/// <reference types="react" />
import { ISortProperties } from './ArrayManipulators';
/**
 * Functions to write Table rows and columns
 */
export interface IArrayColumn {
    fieldName: string;
    title: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
    customWriter?: ((value: any | null | undefined) => string);
    customWriterFromRow?: ((rowData: any | null | undefined) => string);
    hideOnEmpty?: boolean;
    hideOnColumn?: string;
    hideOnFunction?: ((rowData: any | null | undefined) => boolean);
    toDigitsPrecision?: number;
    toCurrencyPrecision?: number;
    momentTSFormat?: string;
    dashIfBlank?: boolean;
    blankIfBlank?: boolean;
    sumInFooter?: boolean;
    doNotSort?: boolean;
    bodySmall?: boolean;
    isACost?: boolean;
}
export interface IArrayStructure {
    title: string;
    columns: IArrayColumn[];
    sortable?: boolean;
    defaultSortColumn?: string;
    minColSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    rowClick?: ((rowData: any) => void);
}
export declare const ComputeValue: (value: any | null | undefined, column: IArrayColumn, rowData: any | null, sumsInFooter: {
    [key: string]: number;
}) => any | null | undefined;
export declare const FormatValue: (value: any | null | undefined, column: IArrayColumn) => any | null | undefined;
export declare const IsColumnEmpty: (arrayData: any[] | null, fieldName: string) => boolean;
export declare const ValidColumns: (arrayData: any[] | null, arrayStructure: IArrayStructure) => IArrayColumn[];
export declare const StructuredArray: (arrayData: any[] | null, arrayStructure: IArrayStructure) => any[];
export declare const ScreenFormatValue: (value: any | null | undefined, column: IArrayColumn) => any | null | undefined;
export declare const ColumnHeadClassNames: (column: IArrayColumn, arrayStructure: IArrayStructure, otherClasses?: {
    [key: string]: boolean;
}) => string;
export declare const ColumnBodyClassNames: (column: IArrayColumn, otherClasses?: {
    [key: string]: boolean;
}) => string;
export declare const ColumnClassNames: (column: IArrayColumn, otherClasses?: {
    [key: string]: boolean;
}) => string;
export declare const ColumnHeaderClick: (column: IArrayColumn, arrayStructure: IArrayStructure, sorter: ISortProperties, setSorter: (newSort: ISortProperties) => void) => void;
export declare const WriteHeadTR: (arrayStructure: IArrayStructure, validColumns: IArrayColumn[], hideCosts: boolean, sorter: ISortProperties, setSorter: (newSort: ISortProperties) => void) => JSX.Element;
export declare const WriteBodyTR: (rowData: any, idx: number, arrayStructure: IArrayStructure, validColumns: IArrayColumn[], hideCosts: boolean, sumsInFooter: {
    [key: string]: number;
}) => JSX.Element;
export declare const WriteBodyTD: (columnValue: any | null | undefined, column: IArrayColumn, hideCosts: boolean, rowData: any, sumsInFooter: {
    [key: string]: number;
}, idx: number) => JSX.Element | null;
export declare const WriteFootTR: (validColumns: IArrayColumn[], sums: {
    [key: string]: number;
}, hideCosts: boolean) => JSX.Element;
