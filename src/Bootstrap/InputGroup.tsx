import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWInputGroupProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	tag?: string | React.ReactType
}

export const InputGroup = (props: IWInputGroupProps) => {
	const TagToUse = props.tag ?? ('div' as React.ReactType)

	return (
		<TagToUse {...OmitProperty(props, 'tag', 'className')} className={`input-group ${props.className ?? ''}`.trim()} />
	)
}
