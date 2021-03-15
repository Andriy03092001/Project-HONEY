import * as types from './types';

const intialState = {
    courses: [],
    totalCount: 0,
    currentPage: 1,
    sizePage: 8,
    successMessage: ""
}

export const panelStudentReducer = (state = intialState, action) => {
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
                sizePage: action.payload.sizePage,
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

        case types.SUBCOURSESSUCCESS:
            return {
                successMessage: action.payload
            }

        default:
            break;
    }
    return state;
}