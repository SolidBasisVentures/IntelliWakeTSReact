import React, {ReactNode, useMemo} from 'react'
import {Dropdown} from 'react-bootstrap'
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
	color?: string
	className?: string
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
	size?: 'sm' | 'lg'
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
		<Dropdown>
			<Dropdown.Toggle className={props.className} color={props.color} size={props.size}>
				{props.faProps !== null && (
					<FontAwesomeIcon {...(props.faProps ?? {icon: faCog})} fixedWidth={!!props.buttonText} />
				)}
				{props.buttonText}
				{!props.noCaret && <span className="caret" />}
			</Dropdown.Toggle>
			<Dropdown.Menu align={props.right ? 'right' : undefined}>
				{visibleDDActions.map((ddAction, idx) => (
					<Dropdown.Item
						className={(ddAction.className ?? '') + (!!ddAction.color ? ` text-${ddAction.color}` : '')}
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
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	)
}
