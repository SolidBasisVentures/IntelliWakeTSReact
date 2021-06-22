import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IWFormFeedbackProps extends React.HTMLProps<HTMLDivElement> {
	valid?: boolean
	tag?: string | React.ReactType
}

export const FormFeedback = (props: IWFormFeedbackProps) => {
	const TagToUse = props.tag ?? ('label' as React.ReactType)

	return (
		<TagToUse
			{...OmitProperty(props, 'valid', 'tag')}
			className={`${props.className ?? ''} ${ClassNames({
				'invalid-feedback': true,
				'd-none': !!props.valid
			})}`.trim()}
		/>
	)
}
