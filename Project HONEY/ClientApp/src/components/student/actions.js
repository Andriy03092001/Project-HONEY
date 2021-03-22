import * as types from './types';
import PanelCoursesService from './service';
import { push } from 'connected-react-router';

export const getCourse = (page = 1, q = "") => {
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


export const getProfile = (id) => {
    return (dispatch) => {
        dispatch({ type: types.GETPROFILESTARTED });

        PanelCoursesService.getProfile(id)
            .then((response) => {
                console.log("Course from server success:", response.data);
                dispatch({ type: types.GETPROFILESSUCCESS, payload: response.data });
            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.GETPROFILEFAILED,
                    errors: err.response.data
                });
            })
            .catch(err => {
                console.log("Global server error", err);
            }
            );
    }
}




export const subOnCourse = (model) => {
    return (dispatch) => {
        dispatch({ type: types.SUBCOURSESSTARTED });

        PanelCoursesService.subOnCourse(model)
            .then((response) => {
                console.log("Data server success:", response.data);
                dispatch({ type: types.SUBCOURSESSUCCESS, payload: response.data });
                dispatch(push('/'));
            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.SUBCOURSESFAILED,
                    errors: err.response.data
                });
            })
            .catch(err => {
                console.log("Global server error", err);
            }
            );
    }
}
