import {ComponentClass} from 'react'

export interface PromptOKCancelState {
	isOpen: boolean
	responder: ((ok: boolean) => void) | undefined
	title: string
	messageBody: string | ComponentClass
	color: string
	okButton?: string | undefined
	cancelButton?: string | undefined
}

const PROMPT_OK_CANCEL_SHOW = 'PROMPT_OK_CANCEL_SHOW'
const PROMPT_OK_CANCEL_DISMISS = 'PROMPT_OK_CANCEL_DISMISS'

interface PromptOKCancelShowAction {
	type: typeof PROMPT_OK_CANCEL_SHOW
	payload: PromptOKCancelState
}

interface PromptOKCancelDismissAction {
	type: typeof PROMPT_OK_CANCEL_DISMISS
	payload: null
}

type PromptOKCancelActionTypes = PromptOKCancelShowAction | PromptOKCancelDismissAction

export const initialPromptOKCancelState: PromptOKCancelState = {
	isOpen: false,
	responder: undefined,
	title: '',
	messageBody: '',
	color: 'primary',
	okButton: 'OK',
	cancelButton: 'Cancel'
}

export function reducerPromptOKCancel(
	state = initialPromptOKCancelState,
	action: PromptOKCancelActionTypes
): PromptOKCancelState {
	switch (action.type) {
		case PROMPT_OK_CANCEL_SHOW: {
			return {
				...state,
				...action.payload
			}
		}
		case PROMPT_OK_CANCEL_DISMISS: {
			return initialPromptOKCancelState
		}
		default:
			return state
	}
}

export const ShowPromptOKCancel = (
	title: string,
	messageBody: string,
	color: string = initialPromptOKCancelState.color,
	okButton: string | null | undefined = initialPromptOKCancelState.okButton,
	cancelButton: string | null | undefined = initialPromptOKCancelState.cancelButton
): any => {
	return async (dispatch: any) => {
		return new Promise((resolve) => {
			dispatch({
				type: PROMPT_OK_CANCEL_SHOW,
				payload: {
					isOpen: true,
					responder: (ok: boolean) => {
						resolve(ok)
					},
					title: title,
					messageBody: messageBody,
					color: color,
					okButton: okButton,
					cancelButton: cancelButton
				}
			} as PromptOKCancelActionTypes)
		})
	}
}

export const DismissPromptOKCancel = () => {
	return (dispatch: any) => {
		dispatch({
			type: PROMPT_OK_CANCEL_DISMISS,
			payload: null
		} as PromptOKCancelActionTypes)
	}
}
