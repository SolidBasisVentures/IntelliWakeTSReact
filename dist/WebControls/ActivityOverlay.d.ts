/// <reference types="react" />
import moment from 'moment';
export interface IActivityOverlayState {
    nestedCount: number;
    lastStart: moment.Moment | undefined;
}
export declare const initialActivityOverlayState: IActivityOverlayState;
interface IProps {
    activityOverlayState: IActivityOverlayState;
    resetActivityOverlay: () => void;
}
export declare const AddActivityOverlay: (prevState: IActivityOverlayState) => IActivityOverlayState;
export declare const RemoveActivityOverlay: (prevState: IActivityOverlayState) => IActivityOverlayState;
/**
 * An overlay with a black background and a spinner that covers the entire screen.
 */
export declare const ActivityOverlay: (props: IProps) => JSX.Element | null;
export {};
