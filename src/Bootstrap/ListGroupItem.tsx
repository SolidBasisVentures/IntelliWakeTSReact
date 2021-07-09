import React, {ReactNode} from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'
import {Spinner} from 'reactstrap'

export interface IWListGroupItemProps extends Omit<React.HTMLProps<HTMLLIElement>, 'ref' | 'action' | 'onClick'> {
	tag?: string | React.ReactType
	active?: boolean
	disabled?: boolean
	color?: string
	action?: boolean
	href?: string
	className?: string
	onClick?: React.MouseEventHandler<any>
	badge?: null | string | number | ReactNode
	badgeColor?: string
	badgeNotSmall?: boolean
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
			{...OmitProperty(props, 'tag', 'className', 'active', 'disabled', 'color', 'action', 'children')}
			className={`${ClassNames({
				active: !!props.active,
				disabled: !!props.disabled,
				'list-group-item-action': !!props.action,
				'd-flex justify-content-between align-items-center': props.badge !== undefined
			})} list-group-item${!!props.color ? ` list-group-item-${props.color}` : ''} ${props.className ?? ''}`.trim()}
			disabled={!!props.onClick && props.disabled ? true : undefined}>
			{props.children}
			{props.badge === null ? (
				<span className={`badge badge-secondary badge-pill ${!!props.badgeNotSmall ? '' : 'small mt-1'}`.trim()}>
					<Spinner
						style={{
							width: '1em',
							height: '1em'
						}}
					/>
				</span>
			) : (
				!!props.badge && (
					<span
						className={`badge badge-${props.badgeColor ?? 'secondary'} badge-pill ${
							!!props.badgeNotSmall ? '' : 'small mt-1'
						}`.trim()}>
						{props.badge}
					</span>
				)
			)}
		</TagToUse>
	)
}
