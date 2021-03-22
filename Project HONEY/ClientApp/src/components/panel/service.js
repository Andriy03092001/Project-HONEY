import axios from 'axios';

export default class StudentService {

    headers = {
        'Content-Type': 'application/json',
      }

    static getStudents(page = 1, q = "") {
          var base_url = `/api/AdminPanel/students?page=${page}&pageSize=15`;
          if(q===""){
            return axios.get(base_url);
          } else {
            return axios.get(base_url+`&searchText=${q}`);
          }    
    }

    static editStudents(model) {
            return axios.put(`/api/AdminPanel/editStudent`, model);
    }

}
