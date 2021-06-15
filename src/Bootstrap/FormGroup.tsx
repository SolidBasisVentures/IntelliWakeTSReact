import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IWFormGroupProps extends React.HTMLProps<HTMLDivElement> {
	className?: string
}

export const FormGroup = (props: IWFormGroupProps) => {
	return (
		<div
			{...OmitProperty(props, 'children')}
			className={`${props.className ?? ''} ${ClassNames({
				'form-group': true
			})}`.trim()}>
			{props.children}
		</div>
	)
}
