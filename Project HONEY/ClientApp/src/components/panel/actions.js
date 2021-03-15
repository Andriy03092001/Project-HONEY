import * as types from './types';
import PanelService from './service';

export const getData = (page = 1, q = "") => {
    return (dispatch) => {
        dispatch({ type: types.GETSTUDENTSTARTED });
        dispatch({ type: types.SETCURRENTPAGE, payload: page });

        if(q!=="") {
            dispatch({ type: types.SETCURRENTPAGE, payload: 1 });
        }

        PanelService.getStudents(page, q)
            .then((response) => {
                console.log("Data server success:", response.data);
                dispatch({ type: types.GETSTUDENTSUCCESS, payload: response.data });
            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.GETSTUDENTFAILED,
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
        dispatch({ type: types.EDITSTUDENTSTARTED });

        PanelService.editStudents(model)
            .then((response) => {
                console.log("Data server success:", response.data);
                dispatch({ type: types.EDITSTUDENTSUCCESS, payload: response.data });
                getData();
            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.EDITSTUDENTFAILED,
                    errors: err.response.data
                });
            })
            .catch(err => {
                console.log("Global server error", err);
            }
            );
    }
}
