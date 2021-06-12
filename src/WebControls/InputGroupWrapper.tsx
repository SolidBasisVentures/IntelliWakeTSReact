import React, {ReactNode, ReactNodeArray} from 'react'
import {InputGroup} from 'react-bootstrap'

interface IProps {
	children?: ReactNode | ReactNodeArray
	prepend?: ReactNode
	append?: ReactNode
}

export const InputGroupWrapper = (props: IProps) => {
	return (
		<>
			{!!props.prepend || !!props.append ? (
				<InputGroup>
					{!!props.prepend && (
						<InputGroup.Prepend>
							<InputGroup.Text>{props.prepend}</InputGroup.Text>
						</InputGroup.Prepend>
					)}
					{props.children}
					{!!props.append && (
						<InputGroup.Append>
							<InputGroup.Text>{props.append}</InputGroup.Text>
						</InputGroup.Append>
					)}
				</InputGroup>
			) : (
				<>{props.children}</>
			)}
		</>
	)
}
