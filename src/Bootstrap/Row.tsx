import React from 'react'
import {ClassNames} from '../Functions'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IIWRowProps extends React.HTMLProps<HTMLDivElement> {
	noGutters?: boolean
	className?: string
	children?: any
}

export const Row = (props: IIWRowProps) => {
	return (
		<div
			{...OmitProperty(props, 'noGutters', 'className', 'children')}
			className={`${props.className ?? ''} ${ClassNames({
				row: true,
				'no-gutters': !!props.noGutters
			})}`.trim()}>
			{props.children}
		</div>
	)
}
