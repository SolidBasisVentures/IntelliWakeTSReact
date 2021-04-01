import React, {ReactNode, useMemo} from 'react'
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown} from 'reactstrap'
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'
import {faCog} from '@fortawesome/pro-regular-svg-icons'

export interface IDDAction {
	hidden?: boolean
	divider?: boolean
	disabled?: boolean
	header?: boolean
	faProps?: FontAwesomeIconProps
	faPropHidden?: boolean
	title?: ReactNode
	action?: () => void
}

export interface IPropsDDActions {
	ddActions: IDDAction[] | (() => IDDAction[])
	hidden?: boolean
	noCaret?: boolean
	buttonText?: ReactNode
	faProps?: FontAwesomeIconProps | null
	className?: string
	color?: string
	right?: boolean
	size?: string
}

/**
 * An array-driven drop down control
 */
export const DDActions = (props: IPropsDDActions) => {
	const visibleDDActions = useMemo(
		() =>
			(typeof props.ddActions === 'function' ? props.ddActions() : props.ddActions).filter(
				(ddAction) => !ddAction.hidden
			),
		[props.ddActions]
	)

	const showDDActions = useMemo(() => !props.hidden && visibleDDActions.length > 0, [visibleDDActions, props.hidden])

	const showFAProps = useMemo(() => !!visibleDDActions.find((ddAction) => !!ddAction.faProps), [visibleDDActions])

	if (!showDDActions) return null

	return (
		<UncontrolledButtonDropdown>
			<DropdownToggle caret={!props.noCaret} className={props.className} color={props.color} size={props.size}>
				{props.faProps !== null && (
					<FontAwesomeIcon {...(props.faProps ?? {icon: faCog})} fixedWidth={!!props.buttonText} />
				)}
				{props.buttonText}
			</DropdownToggle>
			<DropdownMenu right={props.right}>
				{visibleDDActions.map((ddAction, idx) => (
					<DropdownItem
						key={idx}
						disabled={!!ddAction.disabled || !ddAction.action}
						divider={!!ddAction.divider}
						header={!!ddAction.header}
						onClick={() => (!!ddAction.action ? ddAction.action() : () => {})}>
						{showFAProps && (
							<FontAwesomeIcon
								icon={faCog}
								{...ddAction.faProps}
								className={!ddAction.faProps || ddAction.faPropHidden ? 'invisible' : ''}
								fixedWidth
							/>
						)}
						{ddAction.title}
					</DropdownItem>
				))}
			</DropdownMenu>
		</UncontrolledButtonDropdown>
	)
}
