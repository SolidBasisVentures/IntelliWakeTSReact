import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWNavItemProps extends React.HTMLProps<HTMLLIElement> {
	tag?: string | React.ReactType
}

export const NavItem = (props: IWNavItemProps) => {
	const TagToUse = props.tag ?? ('li' as React.ReactType)

	return <TagToUse {...OmitProperty(props, 'tag', 'className')} className={'nav-item ' + (props.className ?? '')} />
}
