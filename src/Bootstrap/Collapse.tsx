import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IIWCollapseProps extends React.HTMLProps<HTMLDivElement> {
	isOpen?: boolean
	tag?: string | React.ReactType
	navbar?: boolean
}

export const Collapse = (props: IIWCollapseProps) => {
	const TagToUse = props.tag ?? ('div' as React.ReactType)

	return (
		<TagToUse
			{...OmitProperty(props, 'isOpen', 'tag', 'navbar')}
			className={(props.className ?? '') + ' collapse' + (!!props.navbar ? ' navbar-collapse' : '')}
		/>
	)
}
