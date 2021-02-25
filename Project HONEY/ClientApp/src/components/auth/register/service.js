import axios from 'axios';


export default class RegisterService {
    static registerUser(model) {
        return axios.post(`/api/Account/register`, model);
    }
}
