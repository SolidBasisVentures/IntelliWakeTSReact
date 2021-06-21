import React from 'react';
export interface IWInputGroupProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tag?: string | React.ReactType;
}
export declare const InputGroup: (props: IWInputGroupProps) => JSX.Element;
