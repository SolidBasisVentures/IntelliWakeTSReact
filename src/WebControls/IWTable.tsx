import React, {LegacyRef} from 'react'
import {ClassNames} from '../Functions'

export interface IIWTableProps {
	bordered?: boolean
	borderless?: boolean
	striped?: boolean
	hover?: boolean
	size?: 'sm' | 'lg'
	responsive?: boolean
	dark?: boolean
	caption?: string
	textSmall?: boolean
	className?: string
	sticky?: boolean
	sortable?: boolean
	tabIndex?: number
	hidden?: boolean
	style?: React.CSSProperties
	innerRef?: LegacyRef<HTMLTableElement>
	children?: any
	onKeyDown?: React.KeyboardEventHandler<HTMLTableElement>
}

export const IWTable = (props: IIWTableProps) => {
	return (
		<table
			className={
				(props.className ?? '') +
				' ' +
				ClassNames({
					table: true,
					'table-bordered': !!props.bordered,
					'border-0': !!props.borderless,
					'table-striped': !!props.striped,
					'table-dark': !!props.dark,
					'table-hover': !!props.hover,
					'table-responsive': !!props.responsive,
					'table-sortable': !!props.sortable,
					'table-sm': props.size !== 'lg',
					small: !!props.textSmall,
					'table-sticky': !!props.sticky
				})
			}
			tabIndex={props.tabIndex}
			hidden={props.hidden}
			style={props.style}
			ref={props.innerRef}
			onKeyDown={props.onKeyDown}>
			{!!props.caption && <caption>{props.caption}</caption>}
			{props.children}
		</table>
	)
}
