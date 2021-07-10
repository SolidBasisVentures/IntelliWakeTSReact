import React from 'react'
import {IWBadgeProps} from './Badge'
import {TBadgeValues} from './ListGroupItem'
import {Spinner} from '../WebControls/Spinner'

export interface IBadgeItemProps extends IWBadgeProps {
	badge?: TBadgeValues
	badgeColor?: string
	badgeNotSmall?: boolean
}

export const BadgeItem = (props: IBadgeItemProps) => {
	return props.badge === null ? (
		<span className={`badge badge-secondary badge-pill ${!!props.badgeNotSmall ? '' : 'small mt-1'}`.trim()}>
			<Spinner />
		</span>
	) : !!props.badge ? (
		<span
			className={`badge badge-${props.badgeColor ?? 'secondary'} badge-pill ${
				!!props.badgeNotSmall ? '' : 'small mt-1'
			}`.trim()}>
			{props.badge}
		</span>
	) : null
}
