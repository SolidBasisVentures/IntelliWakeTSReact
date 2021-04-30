import React, {ReactNode, ReactNodeArray} from 'react'
import {InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'

export interface IProps {
	children?: ReactNode | ReactNodeArray
	prepend?: ReactNode
	append?: ReactNode
}

export function InputGroupWrapper(props: IProps) {
	return (
		<>
			{!!props.prepend || !!props.append ? (
				<InputGroup>
					{!!props.prepend && (
						<InputGroupAddon addonType="prepend">
							<InputGroupText>{props.prepend}</InputGroupText>
						</InputGroupAddon>
					)}
					{props.children}
					{!!props.append && (
						<InputGroupAddon addonType="append">
							<InputGroupText>{props.append}</InputGroupText>
						</InputGroupAddon>
					)}
				</InputGroup>
			) : (
				<>{props.children}</>
			)}
		</>
	)
}
