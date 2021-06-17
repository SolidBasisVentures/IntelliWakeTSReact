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
	tag?: string | React.ReactType
}

export const Label = (props: IIWLabelProps) => {
	const TagToUse = props.tag ?? ('label' as React.ReactType)

	let classes = `${props.className ?? ''}`.trim()

	classes += ' col-form-label'

	if (props.check) classes += ' form-check-label'

	classes += ApplyColumnProp('xs', props.xs)
	classes += ApplyColumnProp('sm', props.sm)
	classes += ApplyColumnProp('md', props.md)
	classes += ApplyColumnProp('lg', props.lg)
	classes += ApplyColumnProp('xl', props.xl)

	return <TagToUse {...OmitProperty(props, 'xs', 'sm', 'md', 'lg', 'xl', 'className')} className={classes.trim()} />
}
