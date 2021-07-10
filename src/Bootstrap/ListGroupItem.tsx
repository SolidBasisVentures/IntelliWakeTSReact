import React, {ReactNode} from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'
import {BadgeItem} from './BadgeItem'

/**
 * null shows spinner
 * !value removes the badge
 * !!value shows the badge
 */
export type TBadgeValues = null | string | number | ReactNode | boolean

export interface IWListGroupItemProps extends Omit<React.HTMLProps<HTMLLIElement>, 'ref' | 'action' | 'onClick'> {
	tag?: string | React.ReactType
	active?: boolean
	disabled?: boolean
	color?: string
	action?: boolean
	href?: string
	className?: string
	onClick?: React.MouseEventHandler<any>
	badge?: TBadgeValues
	badgeColor?: string
}

export const ListGroupItem = (props: IWListGroupItemProps) => {
	const TagToUse =
		props.tag ?? !!props.onClick
			? ('button' as React.ReactType)
			: !!props.href
			? ('a' as React.ReactType)
			: ('li' as React.ReactType)

	return (
		<TagToUse
			type={!!props.onClick ? 'button' : undefined}
			{...OmitProperty(props, 'tag', 'className', 'active', 'disabled', 'color', 'badgeColor', 'action', 'children')}
			className={`${ClassNames({
				active: !!props.active,
				disabled: !!props.disabled,
				'list-group-item-action': !!props.action
				// 'd-flex justify-content-between align-items-center': props.badge === null || !!props.badge
			})} list-group-item${!!props.color ? ` list-group-item-${props.color}` : ''} ${props.className ?? ''}`.trim()}
			disabled={!!props.onClick && props.disabled ? true : undefined}>
			{props.children}
			<BadgeItem badge={props.badge} color={props.badgeColor} className="float-right" />
		</TagToUse>
	)
}
