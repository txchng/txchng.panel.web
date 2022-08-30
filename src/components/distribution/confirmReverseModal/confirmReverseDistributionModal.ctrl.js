import distributionSummaryCart from '@/components/distribution/summaryCart/distributionSummaryCart.vue';

export default {
  name: 'ConfirmReverseDistributionModal',
  props: {
    remittance: Object,
    onCancelMethod: {type: Function},
    onConfirmMethod: {type: Function},
  },
  components:{
    distributionSummaryCart,
  },
  data() {
    return {

    }
  },
  methods :{
    close(){
      this.onCancelMethod();
    },

    confirm() {
      this.onConfirmMethod(this.remittance);
    },
  },
  created() {
    console.log(this.remittance);
  }
}
