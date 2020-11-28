import React, {ReactNode, useMemo} from 'react'
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown} from 'reactstrap'
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'
import {faCog} from '@fortawesome/pro-regular-svg-icons'

export interface IDDAction {
	hidden?: boolean
	divider?: boolean
	disabled?: boolean
	header?: boolean
	faProp?: FontAwesomeIconProps
	title?: ReactNode
	action?: () => void
}

export interface IPropsDDActions {
	ddActions: IDDAction[]
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
	const showDDActions = useMemo(() => !props.hidden && !!props.ddActions.find(ddAction => !ddAction.hidden), [props.ddActions, props.hidden])
	
	if (!showDDActions) return null
	
	return <UncontrolledButtonDropdown>
		<DropdownToggle caret={!props.noCaret} className={props.className} color={props.color} size={props.size}>
			{props.faProps !== null && <FontAwesomeIcon icon={faCog} {...props.faProps} fixedWidth={!!props.buttonText}/>}
			{!!props.buttonText ?? ''}
		</DropdownToggle>
		<DropdownMenu right={props.right}>
			{props.ddActions.filter(ddAction => !ddAction.hidden).map(ddAction =>
			<DropdownItem disabled={!!ddAction.disabled} divider={!!ddAction.divider} header={!!ddAction.header} onClick={() => !!ddAction.action ? ddAction.action() : () => {}}>
				{ddAction.title}
			</DropdownItem>
			)}
		</DropdownMenu>
	</UncontrolledButtonDropdown>
}
