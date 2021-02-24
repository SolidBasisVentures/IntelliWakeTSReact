import React, { ReactNode, ReactNodeArray } from 'react';
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
    children?: ReactNodeArray;
}
export declare const TextStatus: (props: IProps) => React.ReactNodeArray | JSX.Element | null;
export {};
