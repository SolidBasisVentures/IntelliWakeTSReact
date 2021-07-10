import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWCardTitleProps extends Omit<React.HTMLProps<HTMLHeadElement>, 'ref'> {
	tag?: string | React.ReactType
}

export const CardTitle = (props: IWCardTitleProps) => {
	const TagToUse = props.tag ?? ('h5' as React.ReactType)

	return (
		<TagToUse {...OmitProperty(props, 'tag', 'className')} className={`card-title ${props.className ?? ''}`.trim()} />
	)
}
