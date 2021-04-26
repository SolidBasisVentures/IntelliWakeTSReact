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
    okLabel?: ReactNode;
    okAction?: () => void;
    okKeys?: string[] | string;
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
 *
 * @example
 * const [modalPromptProps, setModalPromptProps] = useState<null | IModalPromptProps>(null)
 *
 * setModalPromptProps({
 * 	title: 'Do action?',
 * 	color: 'danger',
 * 	messageBody: 'Are you sure you want to do the action?',
 * 	okLabel: 'Do',
 * 	okAction: () => {doAction()}
 * 	})
 *
 * <ModalPrompt {...modalPromptProps} dismiss={setModalPromptProps} />
 */
export declare const ModalPrompt: (props: IModalPromptProps) => JSX.Element;
