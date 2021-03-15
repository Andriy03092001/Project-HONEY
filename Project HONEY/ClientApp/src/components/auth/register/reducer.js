import * as types from './types';
const intialState = {
    loading: false,
    errors: {}
}

export const registerReducer = (state = intialState, action) => {
    console.log("Reducer working", action);
    switch (action.type) {
        case types.REGISTERSTARTED:
            return {
                loading: true,
                errors: ""
            }

        case types.REGISTERSUCCESS:
            return {
                loading: false,
                errors: ""
            }

        case types.REGISTERFAILED:
                return {
                    loading: false,
                    errors: action.errors
                }
    
        default:
            break;
    }
    return state;
}