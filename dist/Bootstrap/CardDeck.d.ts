import React from 'react';
export interface IWCardDeckProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tag?: string | React.ReactType;
}
export declare const CardDeck: (props: IWCardDeckProps) => JSX.Element;
