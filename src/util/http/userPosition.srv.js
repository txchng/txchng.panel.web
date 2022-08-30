import axios from 'axios';
import endPointList from './endpoint.const';

export default class UserPositionRestResource {
  getAll_positionTitle_keyword(token , positionTitle, keyword){
    var params = {
      token: token,
      keyword: keyword,
      positionTitle: positionTitle,
    };
    return axios.post(endPointList.URL_USERPOSITION_GET_ALL_KEYWORD_POSITIONTITLE, params);
  }

  getAll(token){
    var params = {
      token: token,
    };
    return axios.post(endPointList.URL_USERPOSITION_GET_ALL, params);
  }
}
