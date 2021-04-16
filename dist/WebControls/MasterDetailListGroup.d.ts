import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import { IMasterDetailProps } from './MasterDetail';
export interface IMasterDetailListGroupMDLink {
    hidden?: boolean;
    faProps?: FontAwesomeIconProps;
    color?: string;
    bodyNode?: ReactNode;
    linkClick?: React.MouseEventHandler<any>;
    /** undefined = don't show, null = show with spinner, number (0, 1, etc.) = show */
    counter?: number | null;
    counterColor?: string;
    panelTitle: string;
    panelURL?: string;
    id?: any;
    mdDetail?: ReactNode;
    section?: string;
    sectionNode?: ReactNode;
    className?: string;
}
export interface IMasterDetailListGroupProps extends Omit<IMasterDetailProps, 'children'> {
    mdMasterWidth?: string;
    mdMasterClassName?: string;
    mdMasterTopNode?: ReactNode;
    mdMasterBottomNode?: ReactNode;
    sectionBreak?: 'Title' | 'HR' | 'Gap';
    listGroupItems: IMasterDetailListGroupMDLink[];
    collapsedSections?: string[];
    setCollapsedSections?: (sections: string[]) => void;
    noTextLargeSmaller?: boolean;
}
export declare const MasterDetailListGroup: (props: IMasterDetailListGroupProps) => JSX.Element;
