import { ReactNode } from 'react';
import { TVariables } from '@solidbasisventures/intelliwaketsfoundation';
export interface IModalPromptResponse {
    label: ReactNode;
    action: () => void;
    color?: string;
    outline?: boolean;
}
export declare type TModalPromptResponse = null | IModalPromptResponse | IModalPromptResponse[];
export interface IModalPromptProps {
    title?: ReactNode;
    messageBody?: ReactNode;
    variables?: TVariables;
    color?: string;
    okLabel?: string;
    okAction?: () => void;
    promptResponses?: TModalPromptResponse;
    cancelLabel?: ReactNode;
    cancelColor?: string;
    cancelOutline?: boolean;
    cancelAction?: () => void;
    dismiss?: (nullValue: null, canceled: boolean) => void;
    hidden?: boolean;
}
/**
 * A wrapper for Bootstrap's Modal that handles all the actions.
 */
export declare const ModalPrompt: (props: IModalPromptProps) => JSX.Element;
