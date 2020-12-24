import { PromptOKCancelState } from '../Stores/prompt_ok_cancel';
interface IProps {
    promptOKCancelState: PromptOKCancelState;
    dismissPromptOKCancel: (setPromptOKCancelState: null) => void;
}
export declare const PromptOKCancel: (props: IProps) => JSX.Element;
export {};
