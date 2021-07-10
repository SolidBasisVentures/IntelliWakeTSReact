import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { IMasterDetailProps } from './MasterDetail';
import { TBadgeValues } from '../Bootstrap/ListGroupItem';
export interface IMasterDetailListGroupMDLink {
    hidden?: boolean;
    faProps?: FontAwesomeIconProps;
    color?: string;
    linkNode: ReactNode;
    linkClick?: React.MouseEventHandler<any>;
    /** undefined = don't show, null = show with spinner, number (0, 1, etc.) = show */
    counter?: number | null;
    counterColor?: string;
    badge?: TBadgeValues;
    badgeColor?: string;
    panelTitle?: string;
    panelURL?: string;
    id?: any;
    mdDetail?: ReactNode;
    section?: string;
    sectionNode?: ReactNode;
    className?: string;
}
export interface IMasterDetailListGroupDetail {
    panelTitle: string;
    panelURL?: string;
    mdDetail: ReactNode;
}
export interface IMasterDetailListGroupProps extends Omit<IMasterDetailProps, 'children'> {
    mdMasterWidth?: string;
    mdMasterClassName?: string;
    mdMasterTopNode?: ReactNode;
    mdMasterBottomNode?: ReactNode;
    mdMasterBottomOutsideNode?: ReactNode;
    sectionBreak?: 'Title' | 'HR' | 'Gap';
    listGroupItems: IMasterDetailListGroupMDLink[];
    collapsedSections?: string[];
    setCollapsedSections?: Dispatch<SetStateAction<string[]>>;
    noTextLargeSmaller?: boolean;
    mdDetails?: IMasterDetailListGroupDetail[];
}
export declare const MasterDetailListGroup: (props: IMasterDetailListGroupProps) => JSX.Element;
