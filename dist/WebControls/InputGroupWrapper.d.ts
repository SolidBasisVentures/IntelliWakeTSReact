import { ReactNode, ReactNodeArray } from 'react';
export interface IProps {
    children?: ReactNode | ReactNodeArray;
    prepend?: ReactNode;
    append?: ReactNode;
}
export declare function InputGroupWrapper(props: IProps): JSX.Element;
