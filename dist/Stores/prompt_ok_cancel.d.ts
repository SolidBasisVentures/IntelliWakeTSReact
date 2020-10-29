import { ComponentClass } from 'react';
export interface PromptOKCancelState {
    isOpen: boolean;
    responder: ((ok: boolean) => void) | undefined;
    title: string;
    messageBody: string | ComponentClass;
    color: string;
    okButton?: string | undefined;
    cancelButton?: string | undefined;
}
declare const PROMPT_OK_CANCEL_SHOW = "PROMPT_OK_CANCEL_SHOW";
declare const PROMPT_OK_CANCEL_DISMISS = "PROMPT_OK_CANCEL_DISMISS";
interface PromptOKCancelShowAction {
    type: typeof PROMPT_OK_CANCEL_SHOW;
    payload: PromptOKCancelState;
}
interface PromptOKCancelDismissAction {
    type: typeof PROMPT_OK_CANCEL_DISMISS;
    payload: null;
}
declare type PromptOKCancelActionTypes = PromptOKCancelShowAction | PromptOKCancelDismissAction;
export declare const initialPromptOKCancelState: PromptOKCancelState;
export declare function reducerPromptOKCancel(state: PromptOKCancelState | undefined, action: PromptOKCancelActionTypes): PromptOKCancelState;
export declare const ShowPromptOKCancel: (title: string, messageBody: string, color?: string, okButton?: string | null | undefined, cancelButton?: string | null | undefined) => any;
export declare const DismissPromptOKCancel: () => (dispatch: any) => void;
export {};
