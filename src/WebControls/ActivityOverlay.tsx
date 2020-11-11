import React from 'react';
import moment from "moment";
import {Spinner} from "reactstrap";
import {ActivityOverlayState} from "../Stores/activity_overlay";

interface IProps {
    activityOverlayState: ActivityOverlayState,
    resetActivityOverlay: (() => void)
}

/**
 * An overlay with a black background and a spinner that covers the entire screen.
 */
export const ActivityOverlay = (props: IProps) => {
    function resetActivityOverlay() {
        if (props.activityOverlayState.nestedCount > 0) {
            const seconds = 5;
            if (moment().diff(props.activityOverlayState.lastStart ?? 0, 'seconds') >= seconds) {
                props.resetActivityOverlay();
            }
        }
    }

    if (props.activityOverlayState.nestedCount > 0) {
        return (
            <div className="System_ActivityOverlay" onClick={resetActivityOverlay} color="primary">
                <Spinner style={{width: '3rem', height: '3rem'}}/>
            </div>
        );
    }

    return null;
};
