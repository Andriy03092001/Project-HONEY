import axios from 'axios';

export default class StudentService {
    static getStudents() {
        return axios.get(`https://jsonplaceholder.typicode.com/posts`);
    }

}
