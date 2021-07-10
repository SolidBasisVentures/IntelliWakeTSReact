import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { TStorageType } from '../Hooks/useStorage';
export interface IIWTab {
    faProps?: FontAwesomeIconProps;
    title: string;
    hide?: boolean;
    inactive?: boolean;
    pane: ReactNode;
}
export declare type TPaneLoading = 'All' | 'OnlyActive' | 'KeepOnceLoaded';
export interface IWTabProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tabs: IIWTab[];
    paneLoading?: TPaneLoading;
    rememberKey?: string;
    rememberType?: TStorageType;
    openTab?: string;
    setOpenTab?: Dispatch<SetStateAction<string>>;
    openTabChanged?: (tab: string) => void;
    isDirty?: boolean;
    tabType?: 'tabs' | 'pills';
    fillHeight?: boolean | 'scroll';
    classNamePanes?: string;
    classNamePaneActive?: string;
    noPanePadding?: boolean;
    noPaneBorder?: boolean;
}
export declare const Tab: (props: IWTabProps) => JSX.Element | null;
