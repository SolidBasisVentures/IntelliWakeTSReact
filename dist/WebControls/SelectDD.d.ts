import { ReactElement } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
export interface IPropsSelectDDItem {
    id: number | string | boolean | null;
    name: string | ReactElement;
    data?: any;
    faIcon?: IconProp;
    faIconColor?: string;
}
export interface IPropsSelectDD {
    items: IPropsSelectDDItem[];
    faIcon?: any | undefined | null;
    selectedID?: number | string | boolean | null | undefined;
    handleSelectItem?: (item: any | null) => void;
    handleSelectData?: (data: any | null) => void;
    handleSelectID?: (id: any | null) => void;
    color?: string;
    size?: 'lg' | 'sm' | undefined;
    caret?: boolean;
    className?: string;
    classNameBtn?: string;
    inline?: boolean;
    likeSelect?: boolean;
}
export declare const SelectDD: (props: IPropsSelectDD) => JSX.Element;
