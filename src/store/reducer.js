import * as actionTypes from './actions';
import config from './../config';

const initialState = {
    isOpen: [], //for active default menu
    isTrigger: [], //for active default menu, set blank for horizontal
    ...config,
    isFullScreen: false, // static can't change
};

const reducer = (state = initialState, action) => {
    let trigger = [];
    let open = [];

    switch (action.type) {
        case actionTypes.COLLAPSE_MENU:
            return {
                ...state,
                collapseMenu: !state.collapseMenu
            };
        case actionTypes.COLLAPSE_TOGGLE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }

                if (triggerIndex === -1) {
                    open = [...open, action.menu.id];
                    trigger = [...trigger, action.menu.id];
                }
            } else {
                open = state.isOpen;
                const triggerIndex = (state.isTrigger).indexOf(action.menu.id);
                trigger = (triggerIndex === -1) ? [action.menu.id] : [];
                open = (triggerIndex === -1) ? [action.menu.id] : [];
            }

            return {
                ...state,
                isOpen: open,
                isTrigger: trigger
            };
        case actionTypes.NAV_CONTENT_LEAVE:
            return {
                ...state,
                isOpen: open,
                isTrigger: trigger,
            };
        case actionTypes.NAV_COLLAPSE_LEAVE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }
                return {
                    ...state,
                    isOpen: open,
                    isTrigger: trigger,
                };
            }
            return {...state};
        case actionTypes.FULL_SCREEN :
            return {
                ...state,
                isFullScreen: !state.isFullScreen
            };
        case actionTypes.FULL_SCREEN_EXIT:
            return {
                ...state,
                isFullScreen: false
            };
        case actionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layout: action.layout
            };
        case actionTypes.CHANGE_SUB_LAYOUT:
            return {
                ...state,
                subLayout: action.subLayout
            };
        case actionTypes.LAYOUT_TYPE:
            return {
                ...state,
                layoutType: action.layoutType,
                headerBackColor: initialState.headerBackColor
            };
        case actionTypes.NAV_BACK_COLOR:
            return {
                ...state,
                layoutType: (state.layoutType === 'menu-light') ? 'menu-dark' : state.layoutType
            };
        case actionTypes.HEADER_BACK_COLOR:
            return {
                ...state,
                headerBackColor: action.headerBackColor
            };
        case actionTypes.RTL_LAYOUT:
            return {
                ...state,
                rtlLayout: !state.rtlLayout
            };
        case actionTypes.NAV_FIXED_LAYOUT:
            return {
                ...state,
                navFixedLayout: !state.navFixedLayout
            };
        case actionTypes.HEADER_FIXED_LAYOUT:
            return {
                ...state,
                headerFixedLayout: !state.headerFixedLayout,
                headerBackColor: (!state.headerFixedLayout && initialState.headerBackColor === 'header-default') ? 'header-blue' : state.headerBackColor,
            };
        case actionTypes.BOX_LAYOUT:
            return {
                ...state,
                boxLayout: !state.boxLayout
            };
        case actionTypes.RESET:
            return {
                ...state,
                layout: initialState.layout,
                subLayout: initialState.subLayout,
                collapseMenu: initialState.collapseMenu,
                layoutType: initialState.layoutType,
                headerBackColor: initialState.headerBackColor,
                rtlLayout: initialState.rtlLayout,
                navFixedLayout: initialState.navFixedLayout,
                headerFixedLayout: initialState.headerFixedLayout,
                boxLayout: initialState.boxLayout
            };
        case actionTypes.GET_TANK_LIST:
                return {
                  ...state,
                  tankList: action.tankList,
                  lcList: null
            }
        case actionTypes.GET_LC_LIST:
                return {
                  ...state,
                  lcList: action.lcList
            }
        case actionTypes.GET_TANK_DETAILS:
                return {
                  ...state,
                  getTankDetails: action.getTankDetails
            }
        case actionTypes.SAVE_RECORD_STATUS:
                return {
                  ...state,
                  recordSaveStatus: action.recordSaveStatus
            }
        case actionTypes.UPDATE_RECORD_STATUS:
                return {
                  ...state,
                  recordUpdateStatus: action.recordUpdateStatus
            }
        case actionTypes.LC_DELETE_RECORD_STATUS:
                return {
                  ...state,
                  recordLCDeleteStatus: action.recordLCDeleteStatus
            }
        case actionTypes.LC_COPY_RECORD_STATUS:
                return {
                  ...state,
                  recordCopyStatus: action.recordCopyStatus
            }
        case actionTypes.CLEAR_ALL_TANK_DATA:
                return {
                  ...state,
                  getTankDetails: null,
                  tankList: null,
                  lcList: null,
                  recordSaveStatus: null,
                  recordUpdateStatus: null,
                  recordLCDeleteStatus: null,
                  recordCopyStatus: null
            }
        case actionTypes.GET_VESSEL_LIST:
                return {
                  ...state,
                  vesselList: action.vesselList
            }
        case actionTypes.CLEAR_ALL_VESSEL_DATA:
                return {
                  ...state,
                  vesselList: null,
                  recordSaveStatus: null,
                  recordUpdateStatus: null
            }
        case actionTypes.GET_FW_LIST:
                return {
                  ...state,
                  fwList: action.fwList
            }
        case actionTypes.DELETE_RECORD_STATUS:
                return {
                  ...state,
                  recordDeleteStatus: action.recordDeleteStatus
            }
        case actionTypes.CLEAR_ALL_FW_DATA:
                return {
                  ...state,
                  fwList: null,
                  recordDeleteStatus: null,
            }
        case actionTypes.SAVE_USER_DETAILS:
                return {
                  ...state,
                  loggedInUserDetails: action.userDetails
            }
        case actionTypes.ERROR:
                return {
                  ...state,
                  error: action.error
            }
        case actionTypes.GET_USER_LIST:
                return {
                  ...state,
                  userList: action.userList
            }
        case actionTypes.CLEAR_ALL_USER_DATA:
                return {
                  ...state,
                  userList: null,
                  recordSaveStatus: null,
                  recordUpdateStatus: null
            }
        default:
            return state;
    }
};

export default reducer;