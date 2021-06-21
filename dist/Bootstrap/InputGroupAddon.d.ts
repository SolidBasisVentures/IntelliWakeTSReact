import React from 'react';
export interface IWInputGroupTextAddonProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tag?: string | React.ReactType;
    addonType: 'prepend' | 'append';
}
export declare const InputGroupAddon: (props: IWInputGroupTextAddonProps) => JSX.Element;
