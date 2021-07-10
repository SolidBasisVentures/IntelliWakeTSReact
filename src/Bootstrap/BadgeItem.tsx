// noinspection SuspiciousTypeOfGuard

import React from 'react'
import {IWBadgeProps, Badge} from './Badge'
import {TBadgeValues} from './ListGroupItem'
import {Spinner} from '../WebControls/Spinner'
import {OmitProperty, ToDigits} from '@solidbasisventures/intelliwaketsfoundation'

export interface IBadgeItemProps extends IWBadgeProps {
	badge?: TBadgeValues
	alwaysShowValue?: boolean
}

export const BadgeItem = (props: IBadgeItemProps) => {
	const showProps = OmitProperty(props, 'badge', 'alwaysShowValue')

	return props.badge === null ? (
		<Badge {...showProps} color="light" className={'text-gray ' + (props.className ?? '')}>
			<Spinner />
		</Badge>
	) : (props.alwaysShowValue && props.badge !== undefined) || !!props.badge ? (
		<Badge {...showProps}>{typeof props.badge === 'number' ? ToDigits(props.badge, 0) : props.badge}</Badge>
	) : null
}
