import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export type IWColumnProps =
	| string
	| boolean
	| number
	| {
			size?: boolean | number | string
			// push?: string | number
			// pull?: string | number
			offset?: string | number
			order?: 'first' | 'last' | number
	  }

export interface IIWColProps extends React.HTMLProps<HTMLDivElement> {
	xs?: IWColumnProps
	sm?: IWColumnProps
	md?: IWColumnProps
	lg?: IWColumnProps
	xl?: IWColumnProps
}

export const Col = (props: IIWColProps) => {
	let classes = `${props.className ?? ''}`.trim()

	if (!props.xs && !props.sm && !props.md && !props.lg && !props.xl) {
		classes += ' col'
	}

	const applyColumnProp = (size: string, columnProps: IWColumnProps | null | undefined): string => {
		if (!columnProps) return ''

		let application = ` col-${size}`

		if (columnProps === true) return application

		if (typeof columnProps === 'number' || typeof columnProps === 'string') return `${application}-${columnProps}`

		if (typeof columnProps.size === 'number' || typeof columnProps.size === 'string') {
			application += `${columnProps.size}`
		}

		if (columnProps.offset !== undefined) application += ` offset-${size}-${columnProps.offset}`

		if (columnProps.order !== undefined) application += ` order-${columnProps.order}`

		return application
	}

	classes += applyColumnProp('xs', props.xs)
	classes += applyColumnProp('sm', props.sm)
	classes += applyColumnProp('md', props.md)
	classes += applyColumnProp('lg', props.lg)
	classes += applyColumnProp('xl', props.xl)

	return (
		<div {...OmitProperty(props, 'xs', 'sm', 'md', 'lg', 'xl', 'children')} className={classes.trim()}>
			{props.children}
		</div>
	)
}
