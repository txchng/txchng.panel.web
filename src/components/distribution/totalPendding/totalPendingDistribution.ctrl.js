import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue'
import RemittanceRestResource from '@/util/http/remittance.srv';
import LoadingList from '@/components/share/loading/list/loadingList.vue';
import PriceLabel from '@/components/share/label/price/priceLabel.vue';

const RemittanceService = new RemittanceRestResource();

export default {
  name: 'TotalPendingDistribution',
  components:{
    CurrencyLabel,
    LoadingList,
    PriceLabel
   } ,
  title: 'سامانه تبادل مشتری | مجموع حواله های بخشی تحویل نشده',

  data() {
    return {
      dataSet:undefined,
      isLoading: false,
      token:undefined,
    };
  },
  methods:{
    getTotalPendingDataSet(){
      this.isLoading = true;
      RemittanceService
        .getTotal_pending_distribution(this.token)
        .then(this.onGetTotalPendingDataSetSuccess)
        .catch(this.onGetTotalPendingDataSetFail)
    },
    onGetTotalPendingDataSetSuccess(response){
      this.isLoading = false;
      this.dataSet = response.data.dataSet;
    },
    onGetTotalPendingDataSetFail(err){
      this.isLoading = false;
      console.log(err)
      var MESSAGE_SAVE_FAILE = 'خطا: ' + err.message;
      this.saveToast.text(MESSAGE_SAVE_FAILE).goAway(700);
    }
  },
  created() {
      this.token = localStorage.token;
      if (!this.token) {
          this.$router.push({path: '/login'})
      }
      this.getTotalPendingDataSet();
  },
}
