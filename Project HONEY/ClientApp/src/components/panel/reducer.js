import * as types from './types';

const intialState = {
    students: [],
    totalCount: 0,
    currentPage: 1,
    sizePage: 15
}

export const panelReducer = (state = intialState, action) => {
    console.log("Reducer working", action);
    switch (action.type) {
        case types.GETSTUDENT_STARTED:
            return {
                ...state,
                loading: true,
                errors: ""
            }

        case types.GETSTUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: "",
                students: action.payload.students,
                totalCount: action.payload.totalCount,
                sizePage: action.payload.sizePage
            }

        case types.GETSTUDENT_FAILED:
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


        default:
            break;
    }
    return state;
}