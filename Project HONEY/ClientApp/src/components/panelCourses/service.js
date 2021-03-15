import axios from 'axios';

export default class PanelCoursesService {
  headers = {
    'Content-Type': 'application/json',
  }

  static getCourses(page, q) {
    var model = {
      page: page,
      searchText: q,
      pageSize: 15
    }
    return axios.get(`/api/Courses/courses`, {
      params: {
        dto: model
      }
    }, {
      headers: this.headers
    });
  }

  static addCourse(model) {
    return axios.post(`/api/AdminPanel/addCourse`, model);
  }
}
