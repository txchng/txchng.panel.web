import axios from 'axios';
import endPointList from './endpoint.const';

export default class RemittanceRestResource {

  addDistribution(token, receiver, remittance, intermediateCompany, distributorCompanyWage){
    var params = {
        receiver: receiver,
        remittance: remittance,
        token: token,
        intermediateCompany: intermediateCompany,
        distributorCompanyWage: distributorCompanyWage,
    };
    return axios.post(endPointList.URL_REMITTANCE_ADD_DISTRIBUTION, params);
  }

  reverseDistribution(token, remittanceId){
    var params = {
      token: token,
      remittanceId: remittanceId,
    };
    return axios.post(endPointList.URL_REMITTANCE_REVERSE_DISTRIBUTION, params);
  }

  deliveredDistribution(token, remittanceId){
    var params = {
      token: token,
      remittanceId: remittanceId,
    };
    return axios.post(endPointList.URL_REMITTANCE_DELIVERED_DISTRIBUTION, params);
  }

  getAll_distributionCompany(token){
    let params = {
      token: token,
    };
    return axios.post(endPointList.URL_REMITTANCE_GET_ALL_DISTRIBUTOR_COMPANY, params);
  }

  getAll_distributionCompany_status(token, status){
    let params = {
      token: token,
      status: status,
    };
    return axios.post(endPointList.URL_REMITTANCE_GET_ALL_DISTRIBUTOR_COMPANY_STATUS, params);
  }

  getAll_distributionCompany_byDateTimeRange(token, fromDateTime, toDateTime){
    let params = {
      token: token,
      fromDateTime:fromDateTime,
      toDateTime: toDateTime,
    };
    return axios.post(endPointList.URL_REMITTANCE_GET_ALL_DISTRIBUTOR_COMPANY_FROMDATE_TODATE, params)
  }

  get(token, remittanceId){
    var params = {
      token: token,
      remittanceId: remittanceId,
    };
    return axios.post(endPointList.URL_REMITTANCE_GET, params);
  }

  get_intermediateCompany_remittanceId(token, remittanceId){
    var params = {
      token: token,
      remittanceId: remittanceId,
    };
    return axios.post(endPointList.URL_REMITTANCE_GET_INTERMEDIATE_COMPANY_REMITTANCEID, params);
  }

  get_distributionCompany_remittanceId(token, remittanceId){
    var params = {
      token: token,
      remittanceId: remittanceId,
    };
    return axios.post(endPointList.URL_REMITTANCE_GET_DISTRIBUTOR_COMPANY_REMITTANCEID, params);
  }

  getAll_remittanceCompany(token){
    var params = {
      token: token,
    };
    return axios.post(endPointList.URL_REMITTANCE_GET_ALL_INTERMEDIATE_COMPANY, params)
  }

  add(token, applicant, receiver, remittance){
    var params = {
      token: token,
      applicant: applicant,
      receiver: receiver,
      remittance: remittance,
    };
    return axios.post(endPointList.URL_REMITTANCE_ADD, params);
  }

  setDisterbuterCompany(token, selectedDistributorCompany, distributorCompanyWage, remittanceId){
    var params = {
      token: token,
      distributorCompany: selectedDistributorCompany,
      distributorCompanyWage: distributorCompanyWage,
      remittanceId: remittanceId,
    };
    return axios.post(endPointList.URL_REMITTANCE_SET_DESTRIBUTION_COMPANY, params);
  }

  getTotal_pending_distribution(token){
    var params = {
      token: token,
    };
    return axios.post(endPointList.URL_REMITTANCE_TOTAL_PENDING, params);
  }

  getToday_Total_pending_distribution(token){
    var params = {
      token: token,
    };
    return axios.post(endPointList.URL_REMITTANCE_TODAY_TOTAL_PENDING, params);
  }


  getToday_total_delivered_distribution(token){
    var params = {
      token: token,
    };
    return axios.post(endPointList.URL_REMITTANCE_TODAY_TOTAL_DELIVERED, params);
  }

}
