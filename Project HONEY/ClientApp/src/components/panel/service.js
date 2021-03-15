import axios from 'axios';

export default class StudentService {

    headers = {
        'Content-Type': 'application/json',
      }

    static getStudents(page, q) {
        var model = {
            page: page,
            searchText: q,
            pageSize: 15
        }
        return axios.get(`/api/AdminPanel/students`, {
          params: {
            dto: model
          }
        },{
            headers: this.headers
          });
    }

    static editStudents(model) {
            return axios.put(`/api/AdminPanel/editStudent`, model);
    }

}
