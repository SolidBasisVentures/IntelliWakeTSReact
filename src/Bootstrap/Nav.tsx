import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IIWNavProps extends React.HTMLProps<HTMLDivElement> {
	tabs?: boolean
	pills?: boolean
	vertical?: boolean | string
	horizontal?: string
	justified?: boolean
	fill?: boolean
	navbar?: boolean
	card?: boolean
	tag?: string | React.ReactType
	className?: string
}

export const Nav = (props: IIWNavProps) => {
	const TagToUse = props.tag ?? ('div' as React.ReactType)

	let classes = `${props.className ?? ''}`.trim()
	classes +=
		' ' +
		ClassNames({
			'nav-tabs': !!props.tabs,
			'nav-pills': !!props.pills,
			'nav-fill': !!props.fill,
			'nav-justified': !!props.justified,
			'flex-column': !!props.vertical,
			'justify-content-center': !!props.horizontal
		})

	return (
		<TagToUse
			role={!!props.tabs ? 'tablist' : undefined}
			{...OmitProperty(
				props,
				'tabs',
				'pills',
				'vertical',
				'horizontal',
				'justified',
				'fill',
				'navbar',
				'card',
				'tag',
				'className'
			)}
			className={classes.trim()}
		/>
	)
}
