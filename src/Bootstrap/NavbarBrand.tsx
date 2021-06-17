import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IIWNavbarBrandProps extends React.HTMLProps<HTMLAnchorElement> {
	tag?: string | React.ReactType
}

export const NavbarBrand = (props: IIWNavbarBrandProps) => {
	const TagToUse = props.tag ?? ('a' as React.ReactType)

	return <TagToUse {...OmitProperty(props, 'tag')} />
}
