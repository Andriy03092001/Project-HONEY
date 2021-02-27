import * as types from './types';
import LoginService from './service';
import { push } from 'connected-react-router';
import jwt from 'jsonwebtoken';
import setAuthorisationToken from '../../../utils/setAuthorisationToken';

export const loginUser = (model) => {
    return (dispatch) => {
        dispatch({type: types.LOGIN_STARTED});
        LoginService.loginUser(model)
            .then((response)=>{
                //console.log("Data server success:", response.data);
                loginByJWT(response.data, dispatch);
                dispatch({type: types.LOGIN_SUCCESS});
                dispatch(push('/'));

            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.LOGIN_FAILED,
                    errors: err.response.data
                });
            })
            .catch(err=> {
                console.log("Global server error", err);
            }
        );

    }
}

export const loginByJWT = (tokens, dispatch) => {
    const {token} = tokens;
    var user = jwt.decode(token);
    if (!Array.isArray(user.roles)) {
        user.roles = Array.of(user.roles);
    }
    localStorage.setItem('authToken', token);
    setAuthorisationToken(token);
    dispatch({
        type: types.LOGIN_SET_CURRENT_USER,
        user
    });
    


    console.log("Login user ", user);
}