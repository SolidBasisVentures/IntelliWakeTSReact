// noinspection SuspiciousTypeOfGuard

import React from 'react'
import {IWBadgeProps, Badge} from './Badge'
import {TBadgeValues} from './ListGroupItem'
import {Spinner} from '../WebControls/Spinner'
import {ToDigits} from '@solidbasisventures/intelliwaketsfoundation'

export interface IBadgeItemProps extends IWBadgeProps {
	badge?: TBadgeValues
	badgeColor?: string
	badgeNotSmall?: boolean
	alwaysShowValue?: boolean
}

export const BadgeItem = (props: IBadgeItemProps) => {
	return props.badge === null ? (
		<Badge color="secondary" className={!!props.badgeNotSmall ? '' : 'small mt-1'}>
			<Spinner />
		</Badge>
	) : (props.alwaysShowValue && props.badge !== undefined) || !!props.badge ? (
		<Badge color={props.badgeColor ?? 'secondary'} className={!!props.badgeNotSmall ? '' : 'small mt-1'}>
			{typeof props.badge === 'number' ? ToDigits(props.badge, 0) : props.badge}
		</Badge>
	) : null
}
