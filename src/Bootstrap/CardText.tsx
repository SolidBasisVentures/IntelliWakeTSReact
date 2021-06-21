import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWCardTextProps extends Omit<React.HTMLProps<HTMLParagraphElement>, 'ref'> {
	tag?: string | React.ReactType
	className?: string
}

export const CardText = (props: IWCardTextProps) => {
	const TagToUse = props.tag ?? ('p' as React.ReactType)

	return (
		<TagToUse {...OmitProperty(props, 'tag', 'className')} className={`card-text ${props.className ?? ''}`.trim()} />
	)
}
