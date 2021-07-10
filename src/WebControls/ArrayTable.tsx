import React, {CSSProperties, useState} from 'react'
import {IArrayStructure, ValidColumns, WriteBodyTR, WriteFootTR, WriteHeadTR} from './ArrayStructure'
import {initialSortProperties, ISortProperties, SortObjects} from './ArrayManipulators'
import {ClassNames} from '../Functions'
import {Table} from '../Bootstrap/Table'

export interface IPropsArrayTable {
	arrayData: any[] | null
	arrayStructure: IArrayStructure
	bordered?: boolean
	scrollable?: boolean
	minWidth?: string
	hideCosts?: boolean
}

export const ArrayTable = (props: IPropsArrayTable) => {
	const [sorter, setSorter] = useState<ISortProperties>({
		...initialSortProperties,
		sort_column: props.arrayStructure.defaultSortColumn ?? null
	})

	const sumsInFooter: {[key: string]: number} = {}
	const validColumns = ValidColumns(props.arrayData, props.arrayStructure)

	let styleSettings: CSSProperties = {}

	if (props.minWidth) {
		styleSettings.minWidth = props.minWidth
	}

	return (
		<Table
			size="sm"
			bordered={props.bordered}
			className={ClassNames({
				'table-scrollable': !!props.scrollable,
				['table-col-min-' + props.arrayStructure.minColSize ?? '']: !!props.arrayStructure.minColSize
			})}
			style={styleSettings}
			hover={!!props.arrayStructure.rowClick}>
			<thead>{WriteHeadTR(props.arrayStructure, validColumns, !!props.hideCosts, sorter, setSorter)}</thead>
			<tbody>
				{SortObjects(props.arrayData ?? [], sorter).map((row, idx) =>
					WriteBodyTR(row, idx, props.arrayStructure, validColumns, !!props.hideCosts, sumsInFooter)
				)}
			</tbody>
			{Object.keys(sumsInFooter).length > 0 ? (
				<tfoot>{WriteFootTR(validColumns, sumsInFooter, !!props.hideCosts)}</tfoot>
			) : null}
		</Table>
	)
}
