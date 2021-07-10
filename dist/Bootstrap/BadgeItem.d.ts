import { IWBadgeProps } from './Badge';
import { TBadgeValues } from './ListGroupItem';
export interface IBadgeItemProps extends IWBadgeProps {
    badge?: TBadgeValues;
    badgeColor?: string;
    badgeNotSmall?: boolean;
}
export declare const BadgeItem: (props: IBadgeItemProps) => JSX.Element | null;
