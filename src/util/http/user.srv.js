import axios from 'axios';
import endPointList from './endpoint.const';

export default class UserRestResource {
  checkCredentials(email, password){
    var params = {
      email: email,
      password: password,
    };
    return axios.post(endPointList.URL_USER_LOGIN, params);
  }
}
