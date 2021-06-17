import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWNavLinkProps extends React.HTMLProps<HTMLAnchorElement> {
	tag?: string | React.ReactType
}

export const NavLink = (props: IWNavLinkProps) => {
	const TagToUse = props.tag ?? ('a' as React.ReactType)

	return <TagToUse {...OmitProperty(props, 'tag', 'className')} className={'nav-link ' + (props.className ?? '')} />
}
