import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWCardProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	tag?: string | React.ReactType
}

export const Card = (props: IWCardProps) => {
	const TagToUse = props.tag ?? ('div' as React.ReactType)

	return <TagToUse {...OmitProperty(props, 'tag', 'className')} className={`card ${props.className ?? ''}`.trim()} />
}
