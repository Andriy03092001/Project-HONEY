import * as types from './types';
import PanelService from './service';

export const getData = (page = 1, q = "") => {
    return (dispatch) => {
        dispatch({ type: types.GETSTUDENT_STARTED });
        dispatch({ type: types.SET_CURRENT_PAGE, payload: page });

        if(q!=="") {
            dispatch({ type: types.SET_CURRENT_PAGE, payload: 1 });
        }

        PanelService.getStudents(page, q)
            .then((response) => {
                console.log("Data server success:", response.data);
                dispatch({ type: types.GETSTUDENT_SUCCESS, payload: response.data });
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


export const editStudent = (model) => {
    return (dispatch) => {
        dispatch({ type: types.EDITSTUDENT_STARTED });

        PanelService.editStudents(model)
            .then((response) => {
                console.log("Data server success:", response.data);
                dispatch({ type: types.EDITSTUDENT_SUCCESS, payload: response.data });
                getData();
            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.EDITSTUDENT_FAILED,
                    errors: err.response.data
                });
            })
            .catch(err => {
                console.log("Global server error", err);
            }
            );
    }
}
