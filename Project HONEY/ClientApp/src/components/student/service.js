import axios from 'axios';

export default class PanelCoursesService {
    headers = {
        'Content-Type': 'application/json',
    }

    static getCourses(page = 1, q = "") {
        var base_url = `/api/Courses/courses?page=${page}&pageSize=8`;
        if(q===""){
          return axios.get(base_url);
        } else {
          return axios.get(base_url+`&searchText=${q}`);
        }   
    }

    static getProfile(id) {
        return axios.get(`/api/AdminPanel/profile?id=${id}`, {
            headers: this.headers
        });
    }

    static subOnCourse(model) {
        return axios.post(`/api/Courses/subscription`, model,{
            headers: this.headers
        });
    }
}
