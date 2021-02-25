import * as types from './types';
import RegisterService from './service';
import { useHistory } from "react-router-dom";


export const registerUser = (model) => {
    return (dispatch) => {
        dispatch({type: types.REGISTER_STARTED});
        RegisterService.registerUser(model)
            .then((response)=>{
                const history = useHistory();
                if(response.code === 200) {
                    console.log(200)
                }
                else {
                    console.log(500)
                }
                dispatch({type: types.REGISTER_SUCCESS});
                dispatch(history.push("/"));

            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.REGISTER_FAILED,
                    errors: err.response.data
                });
            })
            .catch(err=> {
                console.log("Global server error", err);
            }
        );

    }
}