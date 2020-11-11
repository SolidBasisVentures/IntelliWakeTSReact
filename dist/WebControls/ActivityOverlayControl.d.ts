/// <reference types="react" />
interface IProps {
    show: boolean;
    spinnerSize?: string;
}
/**
 * An overlay with a white background and a spinner that covers the entire surface of it's parent component.
 */
export declare const ActivityOverlayControl: (props: IProps) => JSX.Element | null;
export {};
