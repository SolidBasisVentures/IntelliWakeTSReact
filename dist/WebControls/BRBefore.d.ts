import { ReactNode, ReactNodeArray } from 'react';
interface IProps {
    text: ReactNode | ReactNodeArray | string | boolean | null | undefined;
    className?: string;
    hidden?: boolean;
}
export declare const BRBefore: (props: IProps) => JSX.Element | null;
export {};
