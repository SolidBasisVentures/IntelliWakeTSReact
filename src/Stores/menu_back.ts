export interface MenuBackItem {
    menuBackActive: boolean,
    menuBackButtonTitle: string,
    menuBackButtonURL: string,
    menuPageTitle: string,
    menuDisplaySize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export interface MenuBackState {
    menuBackItems: MenuBackItem[]
}

const ADD_MENU_BACK = 'ADD_MENU_BACK';
const CLEAN_MENU_BACK = 'CLEAN_MENU_BACK';

interface AddMenuBackAction {
    type: typeof ADD_MENU_BACK
    payload: MenuBackItem
}

interface CleanMenuBackAction {
    type: typeof CLEAN_MENU_BACK
    payload: null
}

type MenuBackActionTypes = AddMenuBackAction | CleanMenuBackAction

const initialMenuBackState: MenuBackState = {
    menuBackItems: []
};

export const initialMenuBackItem: MenuBackItem = {
    menuBackActive: false,
    menuBackButtonTitle: "",
    menuBackButtonURL: "",
    menuPageTitle: "",
    menuDisplaySize: undefined
};

export const reducerMenuBack = (
    state = initialMenuBackState,
    action: MenuBackActionTypes
): MenuBackState => {
    switch (action.type) {
        case ADD_MENU_BACK: {
            const location = window.location.pathname;

            let newState = Object.assign({}, state) as MenuBackState;

            newState.menuBackItems = newState.menuBackItems.filter((item) => {
                return item.menuBackButtonURL.length < location.length;
            });

            newState.menuBackItems.push(action.payload);

            return {
                ...newState
            };
        }
        case CLEAN_MENU_BACK: {
            const location = window.location.pathname;

            let newState = Object.assign({}, state) as MenuBackState;

            newState.menuBackItems = newState.menuBackItems.filter((item) => {
                return item.menuBackButtonURL.length < location.length;
            });

            return {
                ...newState
            };
        }
        default:
            return state
    }
}

export const AddMenuBackItem = (menuBackItem: MenuBackItem) => {
    return (dispatch: any) => {
        dispatch({
            type: ADD_MENU_BACK,
            payload: menuBackItem
        } as MenuBackActionTypes);
    }
}

export const CleanMenuBackItem = () => {
    return (dispatch: any) => {
        dispatch({
            type: CLEAN_MENU_BACK,
            payload: null
        } as MenuBackActionTypes);
    }
}
