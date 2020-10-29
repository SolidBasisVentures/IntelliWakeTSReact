import moment from 'moment'
import {ISortProperties, SetSort} from './ArrayManipulators'
import React from 'react'
import {
	ToCurrency,
	ToCurrencyBlank,
	ToCurrencyDash,
	ToDigits,
	ToDigitsBlank,
	ToDigitsDash
} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IArrayColumn {
    fieldName: string,
    title: string,
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl',
    customWriter?: ((value: any | null | undefined) => string),
    customWriterFromRow?: ((rowData: any | null | undefined) => string),
    hideOnEmpty?: boolean,
    hideOnColumn?: string,
    hideOnFunction?: ((rowData: any | null | undefined) => boolean),
    toDigitsPrecision?: number,
    toCurrencyPrecision?: number,
    momentTSFormat?: string,
    dashIfBlank?: boolean,
    blankIfBlank?: boolean,
    sumInFooter?: boolean,
    doNotSort?: boolean,
    bodySmall?: boolean,
    isACost?: boolean
}

export interface IArrayStructure {
    title: string,
    columns: IArrayColumn[],
    sortable?: boolean,
    defaultSortColumn?: string,
    minColSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    rowClick?: ((rowData: any) => void)
}

export const ComputeValue = (value: any | null | undefined, column: IArrayColumn, rowData: any | null, sumsInFooter: { [key: string]: number }): any | null | undefined => {
    const computedValue = !!column.customWriter ? column.customWriter(value) : !!column.customWriterFromRow ? column.customWriterFromRow(rowData) : value;

    if (column.sumInFooter) {
        sumsInFooter[column.fieldName] = (sumsInFooter[column.fieldName] ?? 0.0);
        if (computedValue) {
            sumsInFooter[column.fieldName] += parseFloat(computedValue) ?? 0.0;
        }
    }

    return computedValue;
};

export const FormatValue = (value: any | null | undefined, column: IArrayColumn): any | null | undefined => {
    if (column.momentTSFormat) {
        if (value) {
            if (!isNaN(parseInt(value))) {
                value = moment.unix(value / 1000).format(column.momentTSFormat);
            }
        } else {
            value = null;
        }
    }

    return value;
};

export const IsColumnEmpty = (arrayData: any[] | null, fieldName: string): boolean => {
    if (!arrayData) return true;

    return !arrayData.find(item => !!(item[fieldName] ?? null));
};

export const ValidColumns = (arrayData: any[] | null, arrayStructure: IArrayStructure): IArrayColumn[] => {
    return arrayStructure.columns.filter(column =>
        (!column.hideOnEmpty || !IsColumnEmpty(arrayData, column.fieldName)) &&
        (!column.hideOnFunction || column.hideOnFunction(arrayData))) ?? [];
};

export const StructuredArray = (arrayData: any[] | null, arrayStructure: IArrayStructure): any[] => {
    let structuredArray: any[] = [];
    const sumsInFooter: { [key: string]: number } = {};
    const validColumns = ValidColumns(arrayData, arrayStructure);

    structuredArray.push(validColumns.map(column => column.title));

    for (const row of (arrayData ?? [])) {
        structuredArray.push(validColumns.map(column => FormatValue(ComputeValue(row[column.fieldName] ?? null, column, row, sumsInFooter), column)));
    }

    if (Object.keys(sumsInFooter).length > 0) {
        structuredArray.push(validColumns.map(column => FormatValue(sumsInFooter[column.fieldName] ?? null, column)));
    }

    return structuredArray;
};

export const ScreenFormatValue = (value: any | null | undefined, column: IArrayColumn): any | null | undefined => {
    if (column.toDigitsPrecision !== undefined) {
        if (column.dashIfBlank) {
            value = ToDigitsDash(value, column.toDigitsPrecision);
        } else if (column.blankIfBlank) {
            value = ToDigitsBlank(value, column.toDigitsPrecision);
        } else {
            value = ToDigits(value, column.toDigitsPrecision);
        }
    } else if (column.toCurrencyPrecision !== undefined) {
        if (column.dashIfBlank) {
            value = ToCurrencyDash(value, column.toDigitsPrecision);
        } else if (column.blankIfBlank) {
            value = ToCurrencyBlank(value, column.toDigitsPrecision);
        } else {
            value = ToCurrency(value, column.toDigitsPrecision);
        }
    } else {
        value = FormatValue(value, column);
    }

    return value;
};

export const ColumnHeadClassNames = (column: IArrayColumn, arrayStructure: IArrayStructure, otherClasses: { [key: string]: boolean } = {}): string => {
    return ColumnClassNames(column, {
        'hoverAction': !!arrayStructure.sortable && !column.doNotSort,
        ...otherClasses
    });
};

export const ColumnBodyClassNames = (column: IArrayColumn, otherClasses: { [key: string]: boolean } = {}): string => {
    return ColumnClassNames(column, {
        'small': !!column.bodySmall,
        ...otherClasses
    });
};

export const ColumnClassNames = (column: IArrayColumn, otherClasses: { [key: string]: boolean } = {}): string => {
    return ClassNames({
        'text-right': column.toDigitsPrecision !== undefined || column.toCurrencyPrecision !== undefined || column.momentTSFormat !== undefined,
        ['td-' + (column.size ?? '')]: !!column.size,
        ...otherClasses
    });
};

export const ColumnHeaderClick = (column: IArrayColumn, arrayStructure: IArrayStructure, sorter: ISortProperties, setSorter: (newSort: ISortProperties) => void) => {
    if (!!arrayStructure.sortable && !column.doNotSort) {
        const newSort = SetSort(sorter, column.fieldName);
        setSorter(newSort);
    }
};

export const WriteHeadTR = (arrayStructure: IArrayStructure, validColumns: IArrayColumn[], hideCosts: boolean, sorter: ISortProperties, setSorter: (newSort: ISortProperties) => void) => {
    return (
        <tr className="table-secondary">
            {validColumns.map((column, idx) =>
                !hideCosts || !column.isACost ?
                    <th key={idx} className={ColumnHeadClassNames(column, arrayStructure)} onClick={() => {
                        ColumnHeaderClick(column, arrayStructure, sorter, setSorter)
                    }}>
                        {column.title}
                    </th>
                    : null
            )}
        </tr>
    );
};

export const WriteBodyTR = (rowData: any, idx: number, arrayStructure: IArrayStructure, validColumns: IArrayColumn[], hideCosts: boolean, sumsInFooter: { [key: string]: number }) => {
    return (
        <tr key={idx} onClick={() => {
            if (!!arrayStructure.rowClick) arrayStructure.rowClick(rowData)
        }}>
            {validColumns.map((column, idx) =>
                WriteBodyTD(rowData[column.fieldName] ?? undefined, column, hideCosts, rowData, sumsInFooter, idx)
            )}
        </tr>
    );
};

export const WriteBodyTD = (columnValue: any | null | undefined, column: IArrayColumn, hideCosts: boolean, rowData: any, sumsInFooter: { [key: string]: number }, idx: number) => {
    if (!hideCosts || !column.isACost) {
        const computedValue = ComputeValue(columnValue, column, rowData, sumsInFooter);

        const formattedValue = ScreenFormatValue(computedValue, column);

        return (
            <td key={idx} className={ColumnBodyClassNames(column)}>
                {formattedValue}
            </td>
        );
    } else {
        return null;
    }
};

export const WriteFootTR = (validColumns: IArrayColumn[], sums: { [key: string]: number }, hideCosts: boolean) => {
    return (
        <tr className="border-top">
            {validColumns.map((column, idx) =>
                (!hideCosts || !column.isACost) ?
                    <th key={idx} className={ColumnClassNames(column, {
                        'border-0': true
                    })}>
                        {sums[column.fieldName] === undefined ?
                            null
                            :
                            ScreenFormatValue(sums[column.fieldName], column)
                        }
                    </th>
                    : null
            )}
        </tr>
    );
};

