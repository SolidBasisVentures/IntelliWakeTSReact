import React, {useCallback, useEffect, useRef} from 'react';
import {Alert} from "reactstrap";
import {TextToHTML} from "../Functions";
import {initialMessageBoxState, MessageBoxState} from '../Stores/message_box'

interface IProps {
    messageBoxState: MessageBoxState | string,
    dismissMessageBox: (() => void)
}

export const MessageBox = (props: IProps) => {
	const propsMessageBoxState = (typeof props.messageBoxState === 'string' || props.messageBoxState instanceof String) ? {...initialMessageBoxState, message: props.messageBoxState} : props.messageBoxState
	
    const dismissTimeout = useRef(setTimeout(() => {}, 1));

    const messageBoxHTML: string = TextToHTML(propsMessageBoxState.messageBody ?? "");

    const dismissMessageBox = useCallback(props.dismissMessageBox, [props.dismissMessageBox]);

    useEffect(() => {
        clearTimeout(dismissTimeout.current);
        if (!!propsMessageBoxState.message && !propsMessageBoxState.noDismiss) {
            dismissTimeout.current = setTimeout(dismissMessageBox, 3000);
        }
    }, [propsMessageBoxState.message, propsMessageBoxState.noDismiss, dismissMessageBox]);

    return (
        <Alert className="System_MessageBox" color={propsMessageBoxState.color ?? 'primary'} isOpen={!!propsMessageBoxState.message} toggle={props.dismissMessageBox}>
            {propsMessageBoxState.message}
            {!!propsMessageBoxState.messageBody ?
                <small>
                    <hr/>
                    <span dangerouslySetInnerHTML={{__html: messageBoxHTML}}>
                        </span>
                </small>
                : null}
        </Alert>
    );
};
