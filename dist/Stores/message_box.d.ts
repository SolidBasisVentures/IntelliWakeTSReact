export interface MessageBoxState {
    message: string | null;
    messageBody?: string | null;
    color?: string;
    noDismiss?: boolean;
}
declare const MESSAGE_BOX_SHOW = "MESSAGE_BOX_SHOW";
declare const MESSAGE_BOX_DISMISS = "MESSAGE_BOX_DISMISS";
interface MessageBoxShowAction {
    type: typeof MESSAGE_BOX_SHOW;
    payload: MessageBoxState;
}
interface MessageBoxDismissAction {
    type: typeof MESSAGE_BOX_DISMISS;
    payload: null;
}
declare type MessageBoxActionTypes = MessageBoxShowAction | MessageBoxDismissAction;
export declare const initialMessageBoxState: MessageBoxState;
export declare function reducerMessageBox(state: MessageBoxState | undefined, action: MessageBoxActionTypes): MessageBoxState;
export declare const ShowMessageBox: (message: string, color?: string, messageBody?: string | null, autoDismiss?: boolean) => (dispatch: any) => void;
export declare const DismissMessageBox: () => (dispatch: any) => void;
export {};
