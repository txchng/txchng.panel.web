import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue'
import LoadingList from '@/components/share/loading/list/loadingList.vue';
import PriceLabel from '@/components/share/label/price/priceLabel.vue';
import DateSelectorInput from '@/components/share/input/dateSelectore/dateSelectorInput.vue';

import TransactionRestResource from '@/util/http/transaction.srv';

const TransactionService = new TransactionRestResource();

export default {
  name : 'TotalTransaction',
  components:{
    CurrencyLabel,
    LoadingList,
    PriceLabel,
    DateSelectorInput
   } ,
   title: 'XCHNG |   إجمالي الصندوق',
   data() {
     return {
       dataSet:undefined,
       isLoading: false,
       token:undefined,
     };
   },
   methods:{
     setDateTime(fromDateTime, toDateTime){
       this.getTotalTransactionDataSet(fromDateTime, toDateTime);
     },
     getTotalTransactionDataSet(fromDateTime, toDateTime){
       this.isLoading = true;
       TransactionService
         .getTotal_company_dateTimeRange(this.token, fromDateTime, toDateTime)
         .then(this.onGetTotalTransactionDataSetSuccess)
         .catch(this.onGetTotalTransactionDataSetFail)
     },
     onGetTotalTransactionDataSetSuccess(response){
       this.isLoading = false;
       this.dataSet = response.data.dataSet;
     },
     onGetTotalTransactionDataSetFail(err){
       this.isLoading = false;
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
   },
};
