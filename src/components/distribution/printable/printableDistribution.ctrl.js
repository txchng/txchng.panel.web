import RemittanceRestResource from '@/util/http/remittance.srv';
const RemittanceService = new RemittanceRestResource();

import distributionSummaryCart from '@/components/distribution/summaryCart/distributionSummaryCart.vue';

export default {
  name : 'PrintableDistribution',
  props:["remittanceId"],
  components:{
    distributionSummaryCart,
  },
  data() {
      return {
          token: undefined,
          remittance: undefined,
      }
  },
  methods:{
    getRemittanceDetail(){
      RemittanceService
          .get_distributionCompany_remittanceId(this.token, this.remittanceId)
          .then(this.onGetRemittanceDetailSuccess)
          .catch(this.onGetRemittanceDetailFail);
    },
    onGetRemittanceDetailSuccess(response){
      this.remittance = response.data.remittance;
    },
    onGetRemittanceDetailFail(err){
      console.log(err)
      var MESSAGE_SAVE_FAILE = 'خطا: ' + err.message;
      this.saveToast.text(MESSAGE_SAVE_FAILE).goAway(700);
    },
  },
  created() {
      this.token = localStorage.token;
      if (!this.token) {
          this.$router.push({path: '/login'})
      }
      this.getRemittanceDetail();
  },
};
