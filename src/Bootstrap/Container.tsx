import React from 'react'
import {ClassNames} from '../Functions'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IIWContainerProps extends React.HTMLProps<HTMLDivElement> {
	fluid?: boolean | string
	className?: string
	children?: any
}

export const Container = (props: IIWContainerProps) => {
	return (
		<div
			{...OmitProperty(props, 'fluid', 'className', 'children')}
			className={`${props.className ?? ''} ${ClassNames({
				container: !props.fluid,
				'container-fluid': !!props.fluid
			})}`.trim()}>
			{props.children}
		</div>
	)
}
