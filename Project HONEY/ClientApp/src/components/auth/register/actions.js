import * as types from './types';
import RegisterService from './service';
import { push } from 'connected-react-router';
import { message } from 'antd';

export const registerUser = (model) => {
    return (dispatch) => {
        dispatch({type: types.REGISTERSTARTED});
        RegisterService.registerUser(model)
            .then((response)=>{
                dispatch({type: types.REGISTERSUCCESS});
                dispatch(push('/'));
                message.success('Register complete!')

            }, err => {
                dispatch({
                    type: types.REGISTERFAILED,
                    errors: err.response.data
                });
            })
            .catch(err=> {
                console.log("Global server error", err);
            }
        );

    }
}