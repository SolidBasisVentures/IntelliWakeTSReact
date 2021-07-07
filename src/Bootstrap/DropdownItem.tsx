import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IWDropdownItemProps extends Omit<React.HTMLProps<HTMLBaseElement>, 'ref'> {
	disabled?: boolean
	tag?: string | React.ReactType
	href?: string
	divider?: boolean
	header?: boolean
}

export const DropdownItem = (props: IWDropdownItemProps) => {
	const TagToUse = props.tag ?? (!!props.href ? ('a' as React.ReactType) : ('div' as React.ReactType))

	let classes = props.className ?? ''
	classes +=
		' ' +
		ClassNames({
			'dropdown-item': !props.header && !props.divider,
			'dropdown-header': !!props.header,
			'dropdown-divider': !!props.divider,
			disabled: !!props.disabled
		})

	return (
		<TagToUse
			{...OmitProperty(props, 'tag', 'disabled', 'divider', 'header', 'className', 'size', 'type')}
			className={classes}
			style={{cursor: !props.disabled && (!!props.href || !!props.onClick) ? 'pointer' : undefined}}
		/>
	)
}
