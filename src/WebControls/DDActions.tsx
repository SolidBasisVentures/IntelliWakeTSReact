import React, {ReactNode} from 'react'
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
	link?: string
	action?: () => void
}

interface IProps {
	ddActions: IDDAction[]
	noCaret?: boolean
	buttonText?: ReactNode
	faProps?: FontAwesomeIconProps | null
	className?: string
}

/**
 * An array-driven drop down control
 */
export const DDActions = (props: IProps) => {
	return <UncontrolledButtonDropdown>
		<DropdownToggle caret={!props.noCaret} className={props.className}>
			{props.faProps !== null && <FontAwesomeIcon icon={faCog} {...props.faProps} fixedWidth={!!props.buttonText}/>}
			{!!props.buttonText ?? ''}
		</DropdownToggle>
		<DropdownMenu>
			{props.ddActions.filter(ddAction => !ddAction.hidden).map(ddAction =>
			<DropdownItem disabled={!!ddAction.disabled} divider={!!ddAction.divider} header={!!ddAction.header} onClick={() => !!ddAction.action ? ddAction.action() : () => {}}>
				{ddAction.title}
			</DropdownItem>
			)}
		</DropdownMenu>
	</UncontrolledButtonDropdown>
}
