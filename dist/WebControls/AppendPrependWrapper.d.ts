import { ReactNode, ReactNodeArray } from 'react';
interface IProps {
    children?: ReactNode | ReactNodeArray;
    prepend?: ReactNode;
    append?: ReactNode;
}
export declare const AppendPrependWrapper: (props: IProps) => JSX.Element | null;
export {};
