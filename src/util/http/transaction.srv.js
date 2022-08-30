import axios from 'axios';
import endPointList from './endpoint.const';

export default class transactionRestResource {

  create(token, price, currencyId, receiverUserPositionId, description){
    var params = {
      receiverUserPositionId: receiverUserPositionId,
      currencyId: currencyId,
      price: price,
      description: description,
      token: token,
    };
    return axios.post(endPointList.URL_TRANSACTION_CREATE, params);
  }

  createFromRemittance(token, remittanceId, price, currencyId, receiverUserPositionId, description){
    var params = {
      receiverUserPositionId: receiverUserPositionId,
      currencyId: currencyId,
      price: price,
      description: description,
      token: token,
      remittanceId: remittanceId,
    };
    return axios.post(endPointList.URL_TRANSACTION_CREATE_FRROM_REMITTANCE, params);
  }

  getAllByDateTimeRange(token, fromDateTime, toDateTime){
    var params = {
      token: token,
      fromDateTime: fromDateTime,
      toDateTime: toDateTime,
    };
    return axios.post(endPointList.URL_TRANSACTION_GET_ALL_DATE_TIME_RANGE, params);
  }

  getTotal_company(token){
    let params = {
      token: token,
    };
    return axios.post(endPointList.URL_TRANSACTION_GET_ALL_COMPANY, params);
  }

  getTotal_company_dateTimeRange(token, fromDateTime, toDateTime){
    let params = {
      token: token,
      fromDateTime: fromDateTime,
      toDateTime: toDateTime,
    };
    return axios.post(endPointList.URL_TRANSACTION_GET_TOTAL_COMPANY_DATE_TIME_RANGE, params);
  }
}
