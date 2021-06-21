import React from 'react';
export interface IWListGroupItemTextProps extends Omit<React.HTMLProps<HTMLParagraphElement>, 'ref'> {
    tag?: string | React.ReactType;
}
export declare const ListGroupItemText: (props: IWListGroupItemTextProps) => JSX.Element;
