import axios from 'axios';

export default class StudentService {

    headers = {
        'Content-Type': 'application/json',
      }

    static getStudents(page = 1, q = "") {
        var model = {
            page: page,
            searchText: q,
            pageSize: 15
        }
        return axios.get(`/api/AdminPanel/students`, {
          body: {
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
