import axios from 'axios';

export default class PanelCoursesService {
    static getCourses(page, q) {
        if (q !== "")
            return axios.get(`/api/Courses/courses?page=${page}&searchText=${q}`);
        else
            return axios.get(`/api/Courses/courses?page=${page}`);
    }

    // static addCourse(model) {
    //     return axios.post(`/api/AdminPanel/addCourse`,model);
    // }
}
