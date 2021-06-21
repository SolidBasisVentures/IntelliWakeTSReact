import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWListGroupItemTextProps extends Omit<React.HTMLProps<HTMLParagraphElement>, 'ref'> {
	tag?: string | React.ReactType
}

export const ListGroupItemText = (props: IWListGroupItemTextProps) => {
	const TagToUse = props.tag ?? ('p' as React.ReactType)

	return (
		<TagToUse
			{...OmitProperty(props, 'tag', 'className')}
			className={`list-group-item-text ${props.className ?? ''}`.trim()}
		/>
	)
}
