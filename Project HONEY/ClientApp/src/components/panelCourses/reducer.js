import * as types from './types';

const intialState = {
    courses: [],
    totalCount: 0,
    currentPage: 1,
    sizePage: 8
}

export const panelCoursesReducer = (state = intialState, action) => {
    switch (action.type) {
        case types.GETCOURSESSTARTED:
            return {
                ...state,
                loading: true,
                errors: ""
            }

        case types.GETCOURSESSUCCESS:
            return {
                ...state,
                loading: false,
                errors: "",
                courses: action.payload.courses,
                totalCount: action.payload.totalCount,
                sizePage: action.payload.sizePage
            }

        case types.GETCOURSESFAILED:
            return {
                ...state,
                loading: false,
                errors: action.errors
            }

        case types.SETCURRENTPAGE:
            return {
                ...state,
                loading: true,
                currentPage: action.payload
            }


            case types.ADDCOURSESSTARTED:
                return {
                    ...state,
                    loading: true,
                    errors: ""
                }
    
            case types.ADDCOURSESSUCCESS:
                return {
                    ...state,
                    loading: false,
                    errors: "",
                }
    
                case types.ADDCOURSESFAILED:
                return {
                    ...state,
                    loading: false,
                    errors: action.errors
                }



        default:
            break;
    }
    return state;
}