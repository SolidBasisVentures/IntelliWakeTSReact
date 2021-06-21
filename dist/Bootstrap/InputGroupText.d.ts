import React from 'react';
export interface IWInputGroupTextProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tag?: string | React.ReactType;
}
export declare const InputGroupText: (props: IWInputGroupTextProps) => JSX.Element;
