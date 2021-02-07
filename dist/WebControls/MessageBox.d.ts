export interface MessageBoxState {
    message: string | null;
    messageBody?: string | null;
    color?: string;
    noDismiss?: boolean;
}
export declare const initialMessageBoxState: MessageBoxState;
interface IProps {
    messageBoxState: MessageBoxState | string;
    dismissMessageBox: (() => void);
}
/**
 * An alert box that appears when a message is passed as a prop,and dismisses after three seconds.
 */
export declare const MessageBox: (props: IProps) => JSX.Element;
export {};
