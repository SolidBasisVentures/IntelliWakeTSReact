import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWInputGroupTextProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	tag?: string | React.ReactType
}

export const InputGroupText = (props: IWInputGroupTextProps) => {
	const TagToUse = props.tag ?? ('div' as React.ReactType)

	return (
		<TagToUse
			{...OmitProperty(props, 'tag', 'className')}
			className={`input-group-text ${props.className ?? ''}`.trim()}
		/>
	)
}
