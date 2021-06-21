import React from 'react';
export interface IWListGroupProps extends Omit<React.HTMLProps<HTMLUListElement>, 'ref'> {
    tag?: string | React.ReactType;
    flush?: boolean;
    className?: string;
}
export declare const ListGroup: (props: IWListGroupProps) => JSX.Element;
