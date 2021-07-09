import React from 'react';
export interface IWListGroupItemHeadingProps extends Omit<React.HTMLProps<HTMLHeadingElement>, 'ref'> {
    tag?: string | React.ReactType;
}
export declare const ListGroupItemHeading: (props: IWListGroupItemHeadingProps) => JSX.Element;
