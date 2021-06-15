import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IWFormProps extends React.HTMLProps<HTMLFormElement> {
	inline?: boolean
	innerRef?: React.Ref<HTMLFormElement>
	className?: string
}

export const Form = (props: IWFormProps) => {
	return (
		<form
			{...OmitProperty(props, 'innerRef', 'inline', 'children')}
			className={`${props.className ?? ''} ${ClassNames({
				form: true,
				'form-inline': !!props.inline
			})}`.trim()}
			ref={props.innerRef}>
			{props.children}
		</form>
	)
}
