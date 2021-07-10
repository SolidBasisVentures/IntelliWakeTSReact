import { SizeProp } from '@fortawesome/fontawesome-svg-core';
interface IProps {
    show: boolean;
    size?: SizeProp;
}
/**
 * An overlay with a white background and a spinner that covers the entire surface of it's parent component.
 */
export declare const ActivityOverlayControl: (props: IProps) => JSX.Element | null;
export {};
