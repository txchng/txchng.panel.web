import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue'
import LoadingList from '@/components/share/loading/list/loadingList.vue';
import PriceLabel from '@/components/share/label/price/priceLabel.vue';

import CreditRestResource from '@/util/http/credit.srv';
const CreditService = new CreditRestResource();

export default {
  name: 'TotalCredit',
  components:{
    CurrencyLabel,
    LoadingList,
    PriceLabel
   } ,
   title: 'XCHNG | Total Credit',
   data() {
     return {
       wageList: [],
       isLoading: false,
       token:undefined,
     };
   },
   methods:{
     getAll() {
       this.isLoading = true;
       CreditService
         .getTotal(this.token)
         .then(this.onGetAllSuccess)
         .catch(this.onGetAllFailed)
     },
     onGetAllSuccess(response){
       this.isLoading = false;
       this.dataSet = response.data.dataSet;
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
       this.getAll();
   },
}
