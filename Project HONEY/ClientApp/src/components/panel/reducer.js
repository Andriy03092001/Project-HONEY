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
        case types.GETSTUDENTSTARTED:
            return {
                ...state,
                loading: true,
                errors: ""
            }

        case types.GETSTUDENTSUCCESS:
            return {
                ...state,
                loading: false,
                errors: "",
                students: action.payload.students,
                totalCount: action.payload.totalCount,
                sizePage: action.payload.sizePage
            }

        case types.GETSTUDENTFAILED:
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


            case types.EDITSTUDENTSTARTED:
                return {
                    ...state,
                    loading: true,
                    errors: ""
                }
    
            case types.EDITSTUDENTSUCCESS:
                return {
                    ...state,
                    loading: false,
                    errors: "",
                }
    
            case types.EDITSTUDENTFAILED:
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