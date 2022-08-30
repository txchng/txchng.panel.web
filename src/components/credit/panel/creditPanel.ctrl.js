
import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue'
import LoadingList from '@/components/share/loading/list/loadingList.vue';
import PriceLabel from '@/components/share/label/price/priceLabel.vue';
import CreditList from '@/components/credit/list/creditList.vue';
import DateSelectorInput from '@/components/share/input/dateSelectore/dateSelectorInput.vue';

import CreditRestResource from '@/util/http/credit.srv';
const CreditService = new CreditRestResource();

export default {
  name: 'CreditPanel',
  components:{
    CurrencyLabel,
    LoadingList,
    PriceLabel,
    CreditList,
    DateSelectorInput,
   } ,
   title: 'سامانه تبادل مشتری | وضعیت صندوق',
   data() {
     return {
       creditList: [],
       isLoading: false,
       token:undefined,
     };
   },
   methods:{
     setDateTime(fromDateTime, toDateTime){
       this.getCreditList(fromDateTime, toDateTime);
     },
     getCreditList(fromDateTime, toDateTime) {
       this.isLoading = true;
       CreditService
         .getAllByDateTimeRange(this.token,fromDateTime, toDateTime)
         .then(this.onGetAllSuccess)
         .catch(this.onGetAllFailed)
     },
     onGetAllSuccess(response){
       this.isLoading = false;
       this.creditList = response.data.creditList;
     },
     onGetAllFailed(err){
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
       //this.getCreditList();
   },
}
