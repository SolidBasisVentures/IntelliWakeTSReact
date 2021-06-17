import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IIWNavbarProps extends React.HTMLProps<HTMLBaseElement> {
	light?: boolean
	dark?: boolean
	// full?: boolean
	fixed?: string
	sticky?: string
	color?: string
	role?: string
	tag?: string | React.ReactType
	expand?: boolean | string
}

export const Navbar = (props: IIWNavbarProps) => {
	const TagToUse = props.tag ?? ('nav' as React.ReactType)

	let classes = `${props.className ?? ''}`.trim()
	classes += ' ' + (!!props.color ? `bg-${props.color} ` : '')
	classes += ' ' + (!!props.expand ? `navbar-expand${typeof props.expand === 'string' ? `-${props.expand}` : ''} ` : '')
	ClassNames({
		navbar: true,
		'navbar-light': !!props.light,
		'navbar-dark': !!props.dark,
		'fixed-top': !!props.fixed,
		'sticky-top': !!props.sticky
	})

	return (
		<TagToUse
			{...OmitProperty(props, 'light', 'dark', 'fixed', 'sticky', 'color', 'tag', 'expand', 'className')}
			className={classes.trim()}
		/>
	)
}
