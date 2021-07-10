import { IWBadgeProps } from './Badge';
import { TBadgeValues } from './ListGroupItem';
export interface IBadgeItemProps extends IWBadgeProps {
    badge?: TBadgeValues;
    badgeNotSmall?: boolean;
    alwaysShowValue?: boolean;
}
export declare const BadgeItem: (props: IBadgeItemProps) => JSX.Element | null;
