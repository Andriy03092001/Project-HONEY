import jwt_decode from "jwt-decode";

export default class NavbarService {

    static isRole() {
      var token = localStorage.getItem('authToken');
      if(token) {
        var decode = jwt_decode(token)
        return decode.roles;
      }
    }


}
