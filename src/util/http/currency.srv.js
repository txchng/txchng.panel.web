import axios from 'axios';
import endPointList from './endpoint.const';

export default class CurrencyRestResource {

  addToCompany(token, currencyId){
    var params = {
      token: token,
      currencyId: currencyId,
    };
    return axios.post(endPointList.URL_CURRENCY_ADD_TOCOMPANY, params);
  }


  removeFromCompany(token, currencyId){
    var params = {
      token: token,
      currencyId: currencyId,
    };
    return axios.post(endPointList.URL_CURRENCY_REMOVE_FROMCOMPANY, params);
  }

  getAll(token){
    var params = {
      token: token,
    };
    return axios.post(endPointList.URL_CURRENCY_GET_ALL, params);
  }

}
