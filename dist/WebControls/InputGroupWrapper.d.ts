import { ReactNode, ReactNodeArray } from 'react';
interface IProps {
    children?: ReactNode | ReactNodeArray;
    prepend?: ReactNode;
    append?: ReactNode;
}
export declare const InputGroupWrapper: (props: IProps) => JSX.Element;
export {};
