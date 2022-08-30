import axios from 'axios';
import endPointList from './endpoint.const';

export default class RequestRestResource {
  setWage(token, wagePrice, currencyId, requestId){
    var params = {
      token: token,
      distributorCompanyWagePrice: wagePrice,
      distributorCompanyWageCurrencyId: currencyId,
      requestId: requestId
    };
    return axios.post(endPointList.URL_REQUEST_SETWAGE, params);
  }

  getAll(token){
    var params = {
      token: token,
    };
    return axios.post(endPointList.URL_REQUEST_GET_ALL, params);
  }

  getAllByDateTimeRange(token, fromDateTime, toDateTime){
    var params = {
      token: token,
      fromDateTime: fromDateTime,
      toDateTime: toDateTime,
    };
    return axios.post(endPointList.URL_REQUEST_GET_ALL_DATE_TIME_RANGE, params);
  }

  reject(token, requestId){
    var params = {
      requestId: requestId,
      token: token,
    };
    return axios.post(endPointList.URL_REQUEST_REJECT, params);
  }

  createForRemittance(token, remittanceId, distributorCompany){
    var params = {
      token: token,
      distributorCompany: distributorCompany,
      remittanceId: remittanceId,
    };
    return axios.post(endPointList.URL_REQUEST_CREATE_FROM_REMITTANCE, params);
  }
}
