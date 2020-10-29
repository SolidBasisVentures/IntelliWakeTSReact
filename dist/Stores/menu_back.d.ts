export interface MenuBackItem {
    menuBackActive: boolean;
    menuBackButtonTitle: string;
    menuBackButtonURL: string;
    menuPageTitle: string;
    menuDisplaySize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
export interface MenuBackState {
    menuBackItems: MenuBackItem[];
}
declare const ADD_MENU_BACK = "ADD_MENU_BACK";
declare const CLEAN_MENU_BACK = "CLEAN_MENU_BACK";
interface AddMenuBackAction {
    type: typeof ADD_MENU_BACK;
    payload: MenuBackItem;
}
interface CleanMenuBackAction {
    type: typeof CLEAN_MENU_BACK;
    payload: null;
}
declare type MenuBackActionTypes = AddMenuBackAction | CleanMenuBackAction;
export declare const initialMenuBackItem: MenuBackItem;
export declare const reducerMenuBack: (state: MenuBackState | undefined, action: MenuBackActionTypes) => MenuBackState;
export declare const AddMenuBackItem: (menuBackItem: MenuBackItem) => (dispatch: any) => void;
export declare const CleanMenuBackItem: () => (dispatch: any) => void;
export {};
