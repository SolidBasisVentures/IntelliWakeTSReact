import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWCardBodyProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	tag?: string | React.ReactType
	className?: string
}

export const CardBody = (props: IWCardBodyProps) => {
	const TagToUse = props.tag ?? ('div' as React.ReactType)

	return (
		<TagToUse {...OmitProperty(props, 'tag', 'className')} className={`card-body ${props.className ?? ''}`.trim()} />
	)
}
