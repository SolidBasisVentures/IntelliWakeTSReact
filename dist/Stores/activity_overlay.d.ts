import moment from "moment";
export interface ActivityOverlayState {
    nestedCount: number;
    lastStart: moment.Moment | undefined;
}
declare const ACTIVITY_OVERLAY_SHOW = "ACTIVITY_OVERLAY_SHOW";
declare const ACTIVITY_OVERLAY_HIDE = "ACTIVITY_OVERLAY_HIDE";
declare const ACTIVITY_OVERLAY_RESET = "ACTIVITY_OVERLAY_RESET";
interface ShowActivityOverlayAction {
    type: typeof ACTIVITY_OVERLAY_SHOW;
    payload: null;
}
interface HideActivityOverlayAction {
    type: typeof ACTIVITY_OVERLAY_HIDE;
    payload: null;
}
interface ResetActivityOverlayAction {
    type: typeof ACTIVITY_OVERLAY_RESET;
    payload: null;
}
declare type ActivityOverlayActionTypes = ShowActivityOverlayAction | HideActivityOverlayAction | ResetActivityOverlayAction;
export declare const reducerActivityOverlay: (state: ActivityOverlayState | undefined, action: ActivityOverlayActionTypes) => ActivityOverlayState;
export declare const ShowActivityOverlay: () => (dispatch: any) => void;
export declare const HideActivityOverlay: () => (dispatch: any) => void;
export declare const ResetActivityOverlay: () => (dispatch: any) => void;
export {};
