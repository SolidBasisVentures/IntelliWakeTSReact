import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IWListGroupProps extends Omit<React.HTMLProps<HTMLUListElement>, 'ref'> {
	tag?: string | React.ReactType
	flush?: boolean
	// horizontal?: boolean | string
	className?: string
}

export const ListGroup = (props: IWListGroupProps) => {
	const TagToUse = props.tag ?? ('ul' as React.ReactType)

	return (
		<TagToUse
			{...OmitProperty(props, 'tag', 'className', 'flush')}
			className={`${ClassNames({'list-group-flush': !!props.flush})} list-group ${props.className ?? ''}`.trim()}
		/>
	)
}
