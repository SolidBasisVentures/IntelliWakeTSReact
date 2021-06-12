import React, {useCallback, useEffect, useRef} from 'react'
import {Alert} from 'react-bootstrap'
import {TextToHTML} from '@solidbasisventures/intelliwaketsfoundation'

export interface MessageBoxState {
	message: string | null
	messageBody?: string | null
	color?: string
	noDismiss?: boolean
}

export const initialMessageBoxState: MessageBoxState = {
	message: null
}

interface IProps {
	messageBoxState: MessageBoxState | string
	dismissMessageBox: () => void
}

/**
 * An alert box that appears when a message is passed as a prop,and dismisses after three seconds.
 */
export const MessageBox = (props: IProps) => {
	const propsMessageBoxState =
		typeof props.messageBoxState === 'string'
			? {...initialMessageBoxState, message: props.messageBoxState}
			: props.messageBoxState

	const dismissTimeout = useRef(setTimeout(() => {}, 1))

	const messageBoxHTML: string = TextToHTML(propsMessageBoxState.messageBody ?? '')

	const dismissMessageBox = useCallback(props.dismissMessageBox, [props.dismissMessageBox])

	useEffect(() => {
		clearTimeout(dismissTimeout.current)
		if (!!propsMessageBoxState.message && !propsMessageBoxState.noDismiss) {
			dismissTimeout.current = setTimeout(dismissMessageBox, 3000)
		}
	}, [propsMessageBoxState.message, propsMessageBoxState.noDismiss, dismissMessageBox])

	return (
		<Alert
			className="System_MessageBox"
			color={propsMessageBoxState.color ?? 'primary'}
			show={!!propsMessageBoxState.message}
			onClose={props.dismissMessageBox}>
			{propsMessageBoxState.message}
			{!!propsMessageBoxState.messageBody ? (
				<small>
					<hr />
					<span dangerouslySetInnerHTML={{__html: messageBoxHTML}} />
				</small>
			) : null}
		</Alert>
	)
}
