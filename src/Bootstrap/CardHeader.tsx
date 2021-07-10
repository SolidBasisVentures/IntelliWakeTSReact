import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWCardHeaderProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	tag?: string | React.ReactType
}

export const CardHeader = (props: IWCardHeaderProps) => {
	const TagToUse = props.tag ?? ('div' as React.ReactType)

	return (
		<TagToUse {...OmitProperty(props, 'tag', 'className')} className={`card-header ${props.className ?? ''}`.trim()} />
	)
}
