import axios from 'axios';
import endPointList from './endpoint.const';

export default class TrackingCodeRestResource {
    get(token, trackingCode) {
        var params = {
            token: token,
            trackingCode: trackingCode,
        };
        return axios.post(endPointList.URL_TACKING_CODE_GET, params);
    }

}
