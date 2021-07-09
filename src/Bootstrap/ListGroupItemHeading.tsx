import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWListGroupItemHeadingProps extends Omit<React.HTMLProps<HTMLHeadingElement>, 'ref'> {
	tag?: string | React.ReactType
}

export const ListGroupItemHeading = (props: IWListGroupItemHeadingProps) => {
	const TagToUse = props.tag ?? ('h5' as React.ReactType)

	return (
		<TagToUse
			{...OmitProperty(props, 'tag', 'className')}
			className={`list-group-item-heading ${props.className ?? ''}`.trim()}
		/>
	)
}
