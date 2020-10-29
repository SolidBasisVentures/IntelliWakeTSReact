import React from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
import {initialPromptOKCancelState} from '../Stores/prompt_ok_cancel'
import {PromptOKCancelState} from '../Stores/prompt_ok_cancel'

interface IProps {
	promptOKCancelState: PromptOKCancelState
	dismissPromptOKCancel: (setPromptOKCancelState: null) => void
}

export const PromptOKCancel = (props: IProps) => {
	function okPromptOKCancel() {
		if (!!props.promptOKCancelState.responder) {
			props.promptOKCancelState.responder(true)
		}

		props.dismissPromptOKCancel(null)
	}

	function cancelPromptOKCancel() {
		if (props.promptOKCancelState.responder !== undefined) {
			props.promptOKCancelState.responder(false)
		}

		props.dismissPromptOKCancel(null)
	}

	const promptOKCancelCalc = props.promptOKCancelState ?? initialPromptOKCancelState

	return (
		<Modal backdrop keyboard isOpen={promptOKCancelCalc.isOpen} toggle={cancelPromptOKCancel}>
			<ModalHeader className={'alert-' + promptOKCancelCalc.color}>{promptOKCancelCalc.title}</ModalHeader>
			<ModalBody>{promptOKCancelCalc.messageBody}</ModalBody>
			<ModalFooter>
				<Button onClick={cancelPromptOKCancel} color="link" hidden={!promptOKCancelCalc.cancelButton}>
					{promptOKCancelCalc.cancelButton}
				</Button>{' '}
				<Button onClick={okPromptOKCancel} color={promptOKCancelCalc.color} hidden={!promptOKCancelCalc.okButton}>
					{promptOKCancelCalc.okButton}
				</Button>
			</ModalFooter>
		</Modal>
	)
}
