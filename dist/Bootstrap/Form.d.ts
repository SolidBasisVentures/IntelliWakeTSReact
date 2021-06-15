import React from 'react';
export interface IWFormProps extends React.HTMLProps<HTMLFormElement> {
    inline?: boolean;
    innerRef?: React.Ref<HTMLFormElement>;
    className?: string;
}
export declare const Form: (props: IWFormProps) => JSX.Element;
