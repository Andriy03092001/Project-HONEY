import axios from 'axios';

export default class StudentService {
    static getStudents(page, q) {
        if (q !== "")
            return axios.get(`/api/AdminPanel/getStudents?page=${page}&q=${q}`);
        else
            return axios.get(`/api/AdminPanel/getStudents?page=${page}`);

    }

    

}
