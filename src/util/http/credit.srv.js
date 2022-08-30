import axios from 'axios';
import endPointList from './endpoint.const';

export default class CreditRestResource {

  create(token, price, currencyId, coworkerCompanyId, description){
    var params = {
      coworkerCompanyId: coworkerCompanyId,
      currencyId: currencyId,
      price: price,
      description: description,
      token: token,
    };
    return axios.post(endPointList.URL_CREDIT_CREATE, params);
  }

  getTotal(token){
    var params = {
      token: token,
    };
    return axios.post(endPointList.URL_CREDIT_GET_TOTAL, params);
  }

  getAllByDateTimeRange(token, fromDateTime, toDateTime){
    var params = {
      token: token,
      fromDateTime: fromDateTime,
      toDateTime: toDateTime,
    };
    return axios.post(endPointList.URL_CREDIT_GET_ALL_DATE_TIME_RANGE, params);
  }

}
