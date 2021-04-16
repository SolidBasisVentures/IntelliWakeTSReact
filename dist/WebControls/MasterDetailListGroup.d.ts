import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import { IMasterDetailProps } from './MasterDetail';
export interface IMasterDetailListGroupMDLink {
    hidden?: boolean;
    faProps?: FontAwesomeIconProps;
    color?: string;
    title: ReactNode;
    /** undefined = don't show, null = show with spinner, number (0, 1, etc.) = show */
    counter?: number | null;
    counterColor?: string;
    panelTitle: string;
    panelURL?: string;
    id?: any;
    mdDetail?: ReactNode;
    section?: string;
    sectionNode?: ReactNode;
}
export interface IMasterDetailListGroupProps extends Omit<IMasterDetailProps, 'children'> {
    mdMasterWidth?: string;
    mdMasterClassName?: string;
    mdMasterTopNode?: ReactNode;
    mdMasterBottomNode?: ReactNode;
    sectionBreak?: 'Title' | 'HR' | 'Gap';
    listGroupClassName?: string;
    listGroupItems: IMasterDetailListGroupMDLink[];
    mdLinkClassName?: string;
}
export declare const MasterDetailListGroup: (props: IMasterDetailListGroupProps) => JSX.Element;
