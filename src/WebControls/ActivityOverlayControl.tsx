import React from 'react';
import {Spinner} from "reactstrap";

interface IProps {
    show: boolean,
    spinnerSize?: string
}

export const ActivityOverlayControl = (props: IProps) => {
    if (props.show) {
        return <div className="System_ActivityOverlay_Control" color="primary">
            <Spinner style={{width: props.spinnerSize ?? '2rem', height: props.spinnerSize ?? '2rem'}}/>
        </div>;
    }

    return null;
};
