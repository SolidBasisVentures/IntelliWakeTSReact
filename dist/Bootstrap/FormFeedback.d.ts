import React from 'react';
export interface IWFormFeedbackProps extends React.HTMLProps<HTMLDivElement> {
    valid?: boolean;
    tag?: string | React.ReactType;
}
export declare const FormFeedback: (props: IWFormFeedbackProps) => JSX.Element;
