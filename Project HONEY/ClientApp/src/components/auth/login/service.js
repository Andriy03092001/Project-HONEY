import axios from 'axios';

export default class LoginService {
    static loginUser(model) {
        return axios.post(`/api/Account/login`, model);
    }

    static loginFacebook(model) {
        return axios.post(`/api/Account/facebook-login`, model);
    }

}
