import * as types from './types';
import PanelService from './service';
import { push } from 'connected-react-router';

export const getData = () => {
    return (dispatch) => {
        dispatch({ type: types.GETSTUDENT_STARTED });
        PanelService.getStudents()
            .then((response) => {
                console.log("Data server success:", response.data);
                dispatch({ type: types.GETSTUDENT_SUCCESS, payload: response.data });
                // dispatch(push('/'));
            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.GETSTUDENT_FAILED,
                    errors: err.response.data
                });
            })
            .catch(err => {
                console.log("Global server error", err);
            }
            );
    }
}