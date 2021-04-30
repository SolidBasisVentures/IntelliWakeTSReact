import { ReactNode, ReactNodeArray } from 'react';
interface IProps {
    text: string | null | undefined;
    prefix?: ReactNode | ReactNodeArray | string | boolean | null;
    suffix?: ReactNode | ReactNodeArray | string | boolean | null;
    className?: string;
    hidden?: boolean;
    noTruncate?: boolean;
}
export declare const EllipsesTruncate: (props: IProps) => JSX.Element | null;
export {};
