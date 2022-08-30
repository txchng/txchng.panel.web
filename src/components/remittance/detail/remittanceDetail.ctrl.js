import remittanceSummaryCart from '@/components/remittance/summaryCart/remittanceSummaryCart.vue';
import LoadingList from '@/components/share/loading/list/loadingList.vue';

import RemittanceRestResource from '@/util/http/remittance.srv';
const RemittanceService = new RemittanceRestResource();


export default {
  name: 'RemittanceDetail',
  components:{
    remittanceSummaryCart,
    LoadingList
  },
  props:["remittanceId"],
  data() {
    return {
      remittance: {},
      isLoading:false,
      token: undefined,
    }
  },
  methods: {
    backToList() {
      this.$router.push({path: '/company'})
    },
    getRemittance(){
      this.isLoading = true;
      RemittanceService.get(this.token, this.remittanceId)
        .then(this.onGetRemittanceSuccess)
        .catch(this.onGetRemittanceFail)
    },
    onGetRemittanceSuccess(response){
      this.isLoading = false;
      this.remittance = response.data.remittance
    },
    onGetRemittanceFail(err){
      this.isLoading = false;
      console.log(err)
    }
  },
  created() {
    this.token = localStorage.token;
    if (!this.token) {
        this.$router.push({path: '/login'});
    }
    this.getRemittance();
 }
}
