import * as types from './types';
import LoginService from './service';
import { push } from 'connected-react-router';
import jwt from 'jsonwebtoken';
import setAuthorisationToken from '../../../utils/setAuthorisationToken';

export const loginUser = (model) => {
    return (dispatch) => {
        dispatch({ type: types.LOGINSTARTED });
        LoginService.loginUser(model)
            .then((response) => {
                //console.log("Data server success:", response.data);
                loginByJWT(response.data, dispatch);
                dispatch({ type: types.LOGINSUCCESS });
                dispatch(push('/profile'));

            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.LOGINFAILED,
                    errors: err.response.data
                });
            })
            .catch(err => {
                console.log("Global server error", err);
            }
            );
    }
}

export const loginFacebook = (model) => {
    return (dispatch) => {
        dispatch({ type: types.LOGINSTARTED });
        LoginService.loginFacebook(model)
            .then((response) => {
                loginByJWT(response.data, dispatch);
                dispatch({ type: types.LOGINSUCCESS });
                dispatch(push('/profile'));

            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.LOGINFAILED,
                    errors: err.response.data
                });
            })
            .catch(err => {
                console.log("Global server error", err);
            }
            );
    }
}


export const Logout = (dispatch) => {
    dispatch({ type: types.LOGOUT });
    localStorage.removeItem("authToken")
    dispatch(push('/'));
}

export const loginByJWT = (tokens, dispatch) => {
    const { token } = tokens;
    var user = jwt.decode(token);
    if (!Array.isArray(user.roles)) {
        user.roles = Array.of(user.roles);
    }
    localStorage.setItem('authToken', token);
    setAuthorisationToken(token);
    dispatch({
        type: types.LOGINSETCURRENTUSER,
        user
    });

    console.log("Login user ", user);
}
