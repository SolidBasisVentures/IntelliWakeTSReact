/// <reference types="react" />
import { ActivityOverlayState } from "../Stores/activity_overlay";
interface IProps {
    activityOverlayState: ActivityOverlayState;
    resetActivityOverlay: (() => void);
}
export declare const ActivityOverlay: (props: IProps) => JSX.Element | null;
export {};
