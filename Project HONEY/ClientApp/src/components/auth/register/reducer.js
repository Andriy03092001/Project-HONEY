import * as types from './types';
const intialState = {
    loading: false,
    errors: {}
}

export const registerReducer = (state = intialState, action) => {
    console.log("Reducer working", action);
    switch (action.type) {
        case types.REGISTER_STARTED:
            return {
                loading: true,
                errors: {}
            }

        case types.REGISTER_SUCCESS:
            return {
                loading: false,
                errors: {}
            }

        case types.REGISTER_FAILED:
                return {
                    loading: false,
                    errors: action.errors
                }
    
        default:
            break;
    }
    return state;
}