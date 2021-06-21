import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWInputGroupTextAddonProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	tag?: string | React.ReactType
	addonType: 'prepend' | 'append'
}

export const InputGroupAddon = (props: IWInputGroupTextAddonProps) => {
	const TagToUse = props.tag ?? ('div' as React.ReactType)

	return (
		<TagToUse
			{...OmitProperty(props, 'tag', 'className', 'addonType')}
			className={`input-group-${props.addonType} ${props.className ?? ''}`.trim()}
		/>
	)
}
