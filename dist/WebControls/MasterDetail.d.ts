import { Dispatch, SetStateAction } from 'react';
import { TBootStrapExtendedSizes } from '../Functions';
export interface MenuBackItem {
    menuBackActive: boolean;
    menuBackButtonTitle: string;
    menuBackButtonURL: string;
    menuPageTitle: string;
    menuDisplaySize?: TBootStrapExtendedSizes;
}
export declare const initialMenuBackItem: MenuBackItem;
export interface IMasterDetailProps {
    children: any;
    mdPath: string;
    backText?: string;
    breakAt: TBootStrapExtendedSizes;
    rememberLast?: boolean;
    className?: string;
    setMenuBackItemState: Dispatch<SetStateAction<MenuBackItem[]>>;
}
export declare const MasterDetail: (props: IMasterDetailProps) => JSX.Element;
interface IPropsMaster {
    children: any;
    width?: string;
    className?: string;
    includePrint?: boolean;
}
export declare const MDMaster: (props: IPropsMaster) => JSX.Element;
interface IPropsMasterLink {
    panel: string;
    id?: any;
    activeClassName?: string;
    className?: string;
    children?: any;
    tag?: 'li' | 'tr' | 'div' | 'span';
    style?: any;
    title?: string;
    onClick?: () => void;
    onDoubleClick?: () => void;
    noAutoScroll?: boolean;
    postPath?: string;
    blockActivate?: boolean;
}
export declare const MDLink: (props: IPropsMasterLink | any) => JSX.Element;
interface IPropsDetail {
    children: any;
    titleText?: string;
    backText?: string;
    exact?: boolean;
    panel?: string;
    hidden?: boolean;
    className?: string;
}
export declare const MDDetail: (props: IPropsDetail) => JSX.Element | null;
export {};
