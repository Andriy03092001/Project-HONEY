import * as types from './types';

const intialState = {
    courses: [],
    totalCount: 0,
    currentPage: 1,
    sizePage: 8
}

export const panelStudentReducer = (state = intialState, action) => {
    switch (action.type) {
        case types.GETCOURSES_STARTED:
            return {
                ...state,
                loading: true,
                errors: ""
            }

        case types.GETCOURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: "",
                courses: action.payload.courses,
                totalCount: action.payload.totalCount,
                sizePage: action.payload.sizePage
            }

        case types.GETCOURSES_FAILED:
            return {
                ...state,
                loading: false,
                errors: action.errors
            }

        case types.SET_CURRENT_PAGE:
            return {
                ...state,
                loading: true,
                currentPage: action.payload
            }


            // case types.ADDCOURSES_STARTED:
            //     return {
            //         ...state,
            //         loading: true,
            //         errors: ""
            //     }
    
            // case types.ADDCOURSES_SUCCESS:
            //     return {
            //         ...state,
            //         loading: false,
            //         errors: "",
            //     }
    
            // case types.ADDCOURSES_FAILED:
            //     return {
            //         ...state,
            //         loading: false,
            //         errors: action.errors
            //     }



        default:
            break;
    }
    return state;
}