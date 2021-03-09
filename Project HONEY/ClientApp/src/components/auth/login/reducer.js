import * as types from './types';
import isEmpty from 'lodash/isEmpty';

console.log(localStorage.getItem('authToken'));

const intialState = {
    token: localStorage.getItem('authToken'),
    // or just !!localStorage.getItem('token')
    isAuthenticated: localStorage.getItem('authToken') ? true : false,
    loading: false,
    errors: {
    }
}

export const loginReducer = (state = intialState, action) => {
    console.log("Reducer working", action);
    switch (action.type) {
        case types.LOGIN_STARTED:
            return {
                ...state,
                loading: true,
                errors: ""
            }
            
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: ""
            }

        case types.LOGIN_FAILED:
                return {
                    ...state,
                    loading: false,
                    errors: action.errors
                }
    
        case types.LOGIN_SET_CURRENT_USER:{
                return {
                    ...state, 
                    user: action.user,
                    isAuthenticated: !isEmpty(action.user),
                };
            }
        default:
            break;
    }
    return state;
}