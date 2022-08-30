import axios from 'axios';
import endPointList from './endpoint.const';

export default class WageRestResource {
  add(token, wage){
    var params = {
      token: token,
      wage: wage,
    };
    return axios.post(endPointList.URL_WAGE_GET_ADD, params);
  }

  getAll(token){
    var params = {
      token: token,
    };
    return axios.post(endPointList.URL_WAGE_GET_ALL, params);
  }
}
