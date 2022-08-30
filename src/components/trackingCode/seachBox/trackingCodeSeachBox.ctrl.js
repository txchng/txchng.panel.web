import TrackingCodeRestResource from '@/util/http/trackingCode.srv.js';
const TrackingCodeService = new TrackingCodeRestResource();

import LoadingList from '@/components/share/loading/list/loadingList.vue';
import remittanceSummaryCart from '@/components/remittance/summaryCart/remittanceSummaryCart.vue';

export default {
  name: 'TrackingCodeSearchBox',
  components:{
    LoadingList,
    remittanceSummaryCart
  },
  data(){
    return {
      searchKey: undefined,
      trackingCode: undefined,
      token: undefined,
      isLoading:false,
    };
  },
  methods:{
    clearSearchKey(){
      this.searchKey = undefined;
    },
    showTrackingCodeDetail(){
      console.log('trackingCode');
    },
    trackingCodeChanged() {
      if(this.searchKey.length == 5){
        console.log(this.searchKey);
        this.getTrackingCode();
      }
    },
    getTrackingCode(){
      this.isLoading = true;
      TrackingCodeService.get(this.token, this.searchKey)
        .then(this.onGetTrackingCodeSuccess)
        .catch(this.onGetTrackingCodeFail);
    },
    onGetTrackingCodeSuccess(response){
      this.isLoading = false;
      this.trackingCode = response.data.trackingCode;
    },
    onGetTrackingCodeFail(error){
      this.isLoading = false;
      console.log(error);
    }
  },
  created() {
    this.token = localStorage.token;
 }
};
