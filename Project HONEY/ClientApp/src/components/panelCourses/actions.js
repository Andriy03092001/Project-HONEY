import * as types from './types';
import PanelCoursesService from './service';

export const getData = (page = 1, q = "") => {
    return (dispatch) => {
        dispatch({ type: types.GETCOURSESSTARTED });
        dispatch({ type: types.SETCURRENTPAGE, payload: page });

        if(q!=="") {
            dispatch({ type: types.SETCURRENTPAGE, payload: 1 });
        }

        PanelCoursesService.getCourses(page, q)
            .then((response) => {
                console.log("Course from server success:", response.data);
                dispatch({ type: types.GETCOURSESSUCCESS, payload: response.data });
            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.GETCOURSESFAILED,
                    errors: err.response.data
                });
            })
            .catch(err => {
                console.log("Global server error", err);
            }
            );
    }
}



export const addCourse = (model) => {
    return (dispatch) => {
        dispatch({ type: types.ADDCOURSESSTARTED });

        PanelCoursesService.addCourse(model)
            .then((response) => {
                console.log("Data server success:", response.data);
                dispatch({ type: types.ADDCOURSESSUCCESS, payload: response.data });
                getData();
            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.ADDCOURSESFAILED,
                    errors: err.response.data
                });
            })
            .catch(err => {
                console.log("Global server error", err);
            }
            );
    }
}
