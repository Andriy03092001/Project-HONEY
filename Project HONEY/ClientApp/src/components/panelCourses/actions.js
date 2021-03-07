import * as types from './types';
import PanelCoursesService from './service';

export const getData = (page = 1, q = "") => {
    return (dispatch) => {
        dispatch({ type: types.GETCOURSES_STARTED });
        dispatch({ type: types.SET_CURRENT_PAGE, payload: page });

        if(q!=="") {
            dispatch({ type: types.SET_CURRENT_PAGE, payload: 1 });
        }

        PanelCoursesService.getCourses(page, q)
            .then((response) => {
                console.log("Course from server success:", response.data);
                dispatch({ type: types.GETCOURSES_SUCCESS, payload: response.data });
            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.GETCOURSES_FAILED,
                    errors: err.response.data
                });
            })
            .catch(err => {
                console.log("Global server error", err);
            }
            );
    }
}

