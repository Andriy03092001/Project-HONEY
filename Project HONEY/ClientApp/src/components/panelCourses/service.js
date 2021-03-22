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

  static addCourse(model) {
    return axios.post(`/api/AdminPanel/addCourse`, model);
  }
}
