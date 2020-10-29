import React, {ReactNode, useCallback, useMemo} from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
import {EvaluateString, TVariables} from '@solidbasisventures/intelliwaketsfoundation'

export interface IModalPromptResponse {
	label: ReactNode
	action: () => void
	color?: string
	outline?: boolean
}

export type TModalPromptResponse = null | IModalPromptResponse | IModalPromptResponse[]

export interface IModalPromptProps {
	title?: ReactNode
	messageBody?: ReactNode
	variables?: TVariables
	color?: string
	okLabel?: string
	okAction?: () => void
	promptResponses?: TModalPromptResponse
	cancelLabel?: ReactNode
	cancelColor?: string
	cancelOutline?: boolean
	cancelAction?: () => void
	dismiss?: (nullValue: null, canceled: boolean) => void
	hidden?: boolean
}

export const ModalPrompt = (props: IModalPromptProps) => {
	const promptResponsesAsArray = useMemo(() => {
		if (props.promptResponses === null || props.promptResponses === undefined) return [] as IModalPromptResponse[]

		if (props.promptResponses.constructor === Array) {
			return props.promptResponses as IModalPromptResponse[]
		} else {
			return [props.promptResponses] as IModalPromptResponse[]
		}
	}, [props.promptResponses])

	const title = useMemo(() => {
		if (typeof props.title !== 'string' || !props.variables) return props.title

		return EvaluateString(props.title, props.variables)
	}, [props.title, props.variables])

	const messageBody = useMemo(() => {
		if (typeof props.messageBody !== 'string' || !props.variables) return props.messageBody

		return EvaluateString(props.messageBody, props.variables)
	}, [props.messageBody, props.variables])

	const dismiss = useCallback(
		(canceled: boolean) => {
			if (!!props.dismiss) props.dismiss(null, canceled)
			if (canceled && !!props.cancelAction) props.cancelAction()
		},
		[props.dismiss, props.cancelAction]
	)

	return (
		<Modal
			backdrop
			keyboard
			isOpen={
				((props.promptResponses !== null && props.promptResponses !== undefined) ||
					(!!props.okLabel && !!props.okAction)) &&
				!props.hidden
			}
			toggle={() => dismiss(true)}>
			<ModalHeader className={'alert-' + (props.color ?? 'primary')}>{title}</ModalHeader>
			{!!messageBody && <ModalBody>{messageBody}</ModalBody>}
			<ModalFooter>
				<Button
					type="button"
					onClick={() => dismiss(true)}
					outline={props.cancelOutline}
					color={
						props.cancelColor ??
						(promptResponsesAsArray.length === 0 && (!props.okLabel || !props.okAction)
							? props.color ?? 'primary'
							: 'link')
					}>
					{props.cancelLabel ??
						(promptResponsesAsArray.length === 0 && (!props.okLabel || !props.okAction) ? 'OK' : 'Cancel')}
				</Button>
				{promptResponsesAsArray.map((promptResponse, idx) => (
					<Button
						key={idx}
						onClick={() => {
							promptResponse.action()
							dismiss(false)
						}}
						outline={promptResponse.outline}
						color={promptResponse.color ?? props.color ?? 'primary'}
						className="ml-1">
						{promptResponse.label}
					</Button>
				))}
				{!!props.okLabel && !!props.okAction && (
					<Button
						onClick={() => {
							!!props.okAction && props.okAction()
							dismiss(false)
						}}
						color={props.color ?? props.color ?? 'primary'}
						className="ml-1">
						{props.okLabel}
					</Button>
				)}
			</ModalFooter>
		</Modal>
	)
}
