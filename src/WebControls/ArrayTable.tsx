import React, {CSSProperties, useState} from 'react';
import {Table} from "reactstrap";
import {
    IArrayStructure,
    ValidColumns,
    WriteBodyTR, WriteFootTR,
    WriteHeadTR
} from './ArrayStructure';
import {ClassNames} from "../Functions";
import {initialSortProperties, ISortProperties, SortObjects} from "./ArrayManipulators";

export interface IPropsArrayTable {
    arrayData: any[] | null,
    arrayStructure: IArrayStructure,
    bordered?: boolean,
    scrollable?: boolean,
    minWidth?: string,
    hideCosts?: boolean
}

export const ArrayTable = (props: IPropsArrayTable) => {
    const [sorter, setSorter] = useState({
        ...initialSortProperties,
        sort_column: props.arrayStructure.defaultSortColumn ?? null
    } as ISortProperties);

    const sumsInFooter: { [key: string]: number } = {};
    const validColumns = ValidColumns(props.arrayData, props.arrayStructure);

    let styleSettings: CSSProperties = {};

    if (props.minWidth) {
        styleSettings.minWidth = props.minWidth
    }

    return (
        <Table size="sm" bordered={props.bordered} className={ClassNames({
            'table-scrollable': !!props.scrollable,
            ['table-col-min-' + props.arrayStructure.minColSize ?? '']: !!props.arrayStructure.minColSize
        })} style={styleSettings} hover={!!props.arrayStructure.rowClick}>
            <thead>
            {WriteHeadTR(props.arrayStructure, validColumns, !!props.hideCosts, sorter, setSorter)}
            </thead>
            <tbody>
            {SortObjects(props.arrayData ?? [], sorter).map((row, idx) =>
                WriteBodyTR(row, idx, props.arrayStructure, validColumns, !!props.hideCosts, sumsInFooter)
            )}
            </tbody>
            {Object.keys(sumsInFooter).length > 0 ?
                <tfoot>
                {WriteFootTR(validColumns, sumsInFooter, !!props.hideCosts)}
                </tfoot>
                :
                null
            }
        </Table>
    );
};
