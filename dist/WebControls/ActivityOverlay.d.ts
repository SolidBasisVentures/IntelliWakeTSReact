import { ActivityOverlayState } from "../Stores/activity_overlay";
interface IProps {
    activityOverlayState: ActivityOverlayState;
    resetActivityOverlay: (() => void);
}
/**
 * An overlay with a black background and a spinner that covers the entire screen.
 */
export declare const ActivityOverlay: (props: IProps) => JSX.Element | null;
export {};
