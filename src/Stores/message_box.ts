import _ from 'lodash'

export interface MessageBoxState {
    message: string | null
    messageBody?: string | null
    color?: string
    noDismiss?: boolean
}

const MESSAGE_BOX_SHOW = 'MESSAGE_BOX_SHOW';
const MESSAGE_BOX_DISMISS = 'MESSAGE_BOX_DISMISS';

interface MessageBoxShowAction {
    type: typeof MESSAGE_BOX_SHOW
    payload: MessageBoxState
}

interface MessageBoxDismissAction {
    type: typeof MESSAGE_BOX_DISMISS
    payload: null
}

type MessageBoxActionTypes = MessageBoxShowAction | MessageBoxDismissAction

export const initialMessageBoxState: MessageBoxState = {
    message: null
};

export function reducerMessageBox(
    state = initialMessageBoxState,
    action: MessageBoxActionTypes
): MessageBoxState {
    switch (action.type) {
        case MESSAGE_BOX_SHOW: {
            if (_.isEqual(state, action.payload)) {
                return state;
            }

            return {
                ...state,
                ...action.payload
            };
        }
        case MESSAGE_BOX_DISMISS: {
            return initialMessageBoxState;
        }
        default:
            return state
    }
}

export const ShowMessageBox = (message: string, color: string = "primary", messageBody: string | null = null, autoDismiss: boolean = true) => {
    return (dispatch: any) => {
        dispatch({
            type: MESSAGE_BOX_SHOW,
            payload: {
                message: message,
                messageBody: messageBody,
                color: color,
                autoDismiss: autoDismiss
            }
        } as MessageBoxActionTypes);
    }
}

export const DismissMessageBox = () => {
    return (dispatch: any) => {
        dispatch({
            type: MESSAGE_BOX_DISMISS,
            payload: null
        } as MessageBoxActionTypes);
    }
}
