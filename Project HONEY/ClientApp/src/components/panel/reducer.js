import * as types from './types';

const intialState = {
    students: []
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
                students: action.payload
            }

        case types.GETSTUDENT_FAILED:
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