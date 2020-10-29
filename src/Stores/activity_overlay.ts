import moment from "moment";

export interface ActivityOverlayState {
    nestedCount: number,
    lastStart: moment.Moment | undefined
}

const ACTIVITY_OVERLAY_SHOW = 'ACTIVITY_OVERLAY_SHOW';
const ACTIVITY_OVERLAY_HIDE = 'ACTIVITY_OVERLAY_HIDE';
const ACTIVITY_OVERLAY_RESET = 'ACTIVITY_OVERLAY_RESET';

interface ShowActivityOverlayAction {
    type: typeof ACTIVITY_OVERLAY_SHOW
    payload: null
}

interface HideActivityOverlayAction {
    type: typeof ACTIVITY_OVERLAY_HIDE
    payload: null
}

interface ResetActivityOverlayAction {
    type: typeof ACTIVITY_OVERLAY_RESET
    payload: null
}

type ActivityOverlayActionTypes = ShowActivityOverlayAction | HideActivityOverlayAction | ResetActivityOverlayAction;

const initialState: ActivityOverlayState = {
    nestedCount: 0,
    lastStart: undefined
};

export const reducerActivityOverlay = (
    state = initialState,
    action: ActivityOverlayActionTypes
): ActivityOverlayState => {
    switch (action.type) {
        case ACTIVITY_OVERLAY_SHOW: {
            return {
                nestedCount: state.nestedCount + 1,
                lastStart: moment()
            };
        }
        case ACTIVITY_OVERLAY_HIDE: {
            if (state.nestedCount > 0) {
                return {
                    nestedCount: state.nestedCount - 1,
                    lastStart: state.lastStart
                };
            } else {
                return initialState;
            }
        }
        case ACTIVITY_OVERLAY_RESET: {
            return initialState;
        }
        default:
            return state
    }
}

export const ShowActivityOverlay = () => {
    return (dispatch: any) => {
        dispatch({
            type: ACTIVITY_OVERLAY_SHOW,
            payload: null
        } as ActivityOverlayActionTypes);
    }
}

export const HideActivityOverlay = () => {
    return (dispatch: any) => {
        dispatch({
            type: ACTIVITY_OVERLAY_HIDE,
            payload: null
        } as ActivityOverlayActionTypes);
    }
}

export const ResetActivityOverlay = () => {
    return (dispatch: any) => {
        dispatch({
            type: ACTIVITY_OVERLAY_RESET,
            payload: null
        } as ActivityOverlayActionTypes);
    }
}
