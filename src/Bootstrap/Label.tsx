import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ApplyColumnProp, IWColumnProps} from './ColProp'

export interface IIWLabelProps extends React.HTMLProps<HTMLLabelElement> {
	xs?: IWColumnProps
	sm?: IWColumnProps
	md?: IWColumnProps
	lg?: IWColumnProps
	xl?: IWColumnProps

	hidden?: boolean
	check?: boolean
	disabled?: boolean
	for?: string
}

export const Label = (props: IIWLabelProps) => {
	let classes = `${props.className ?? ''}`.trim()

	classes += ' col-form-label'

	if (props.check) classes += ' form-check-label'

	classes += ApplyColumnProp('xs', props.xs)
	classes += ApplyColumnProp('sm', props.sm)
	classes += ApplyColumnProp('md', props.md)
	classes += ApplyColumnProp('lg', props.lg)
	classes += ApplyColumnProp('xl', props.xl)

	return (
		<label {...OmitProperty(props, 'xs', 'sm', 'md', 'lg', 'xl', 'children')} className={classes.trim()}>
			{props.children}
		</label>
	)
}
