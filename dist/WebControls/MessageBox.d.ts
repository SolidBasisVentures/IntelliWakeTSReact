/// <reference types="react" />
import { MessageBoxState } from '../Stores/message_box';
interface IProps {
    messageBoxState: MessageBoxState | string;
    dismissMessageBox: (() => void);
}
export declare const MessageBox: (props: IProps) => JSX.Element;
export {};
