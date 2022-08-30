import axios from 'axios';
import endPointList from './endpoint.const';

export default class CompanyRestResource {

    addCoWorkerCompany(token, coWorkercompany, owner) {
        var params = {
            token: token,
            coWorkercompany: coWorkercompany,
            owner: owner,
        };
        return axios.post(endPointList.URL_COMPANY_ADD_COWORKER, params);
    }

    getCoWorkerCompanyList(token) {
        var params = {
            token: token,
        };
        return axios.post(endPointList.URL_COMPANY_COWORKERLIST, params);
    }

    getAllCurrencyList(token) {
        var params = {
            token: token,
        };
        return axios.post(endPointList.URL_COMPANY_GETALL_CURRENCY, params);
    }

}
