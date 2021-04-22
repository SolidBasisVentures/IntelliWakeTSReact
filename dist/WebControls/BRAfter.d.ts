import { ReactNode, ReactNodeArray } from 'react';
interface IProps {
    text: ReactNode | ReactNodeArray | string | boolean | null | undefined;
    prefix?: ReactNode | ReactNodeArray | string | boolean | null;
    suffix?: ReactNode | ReactNodeArray | string | boolean | null;
    className?: string;
    hidden?: boolean;
}
export declare const BRAfter: (props: IProps) => JSX.Element | null;
export {};
