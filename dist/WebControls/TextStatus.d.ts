import { ReactNode, ReactNodeArray } from 'react';
export interface ITextStatusState {
    message: ReactNode | null;
    noDismiss?: boolean;
    color?: string;
    className?: string;
}
export declare type TTextStatusState = ITextStatusState | string | null;
export declare const initialTextStatusState: TTextStatusState;
interface IProps {
    textStatus: TTextStatusState;
    clearTextStatus: () => void;
    children?: ReactNode | ReactNodeArray;
}
export declare const TextStatus: (props: IProps) => {} | null;
export {};
