import axios from 'axios';

export default class StudentService {
    static getStudents(page, q) {
        if (q !== "")
            return axios.get(`/api/AdminPanel/students?page=${page}&searchText=${q}`);
        else
            return axios.get(`/api/AdminPanel/students?page=${page}`);
    }

    static editStudents(model) {
            return axios.put(`/api/AdminPanel/editStudent`, model);
    }

}
