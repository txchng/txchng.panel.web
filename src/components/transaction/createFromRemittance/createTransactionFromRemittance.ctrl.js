import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue';
import PriceLabel from '@/components/share/label/price/priceLabel.vue';
import LoadingList from '@/components/share/loading/list/loadingList.vue'
import UserLabel from '@/components/user/label/userLabel.vue';


import TransactionRestResource from '@/util/http/transaction.srv';
import RemittanceRestResource from '@/util/http/remittance.srv';

const TransactionService = new TransactionRestResource();
const RemittanceService = new RemittanceRestResource();

export default {
  name: "CreateTransactionFromRemittance",
  props:["remittanceId"],
  components:{
    CurrencyLabel,
    PriceLabel,
    LoadingList,
    UserLabel
  },
  data() {
    return {
      remittance: {},
      isLoading:false,
      token: undefined,
    }
  },
  methods:{
    createTransaction(){
      let finalPrice = -1 * this.remittance.price;
      this.isLoading = true;
      var MESSAGE_SAVEING = 'فی حالة التخزین ...';
      this.saveToast = this.$toasted.show(MESSAGE_SAVEING, {
          type: 'info',
      });
      let description = `حواله ${this.remittance._id}`;
      TransactionService
        .createFromRemittance(this.token, this.remittance._id, finalPrice, this.remittance.currency._id, this.remittance.receiver._id, description)
        .then(this.onCreateTransactionSuccess)
        .catch(this.onCreateTransactionFail);
    },
    onCreateTransactionSuccess(response){
      this.isLoading = false;
      console.log(response.data.transaction);
      var MESSAGE_SAVED = 'خزّنت!'
      this.saveToast.text(MESSAGE_SAVED).goAway(1700);
      this.goToList();
    },
    onCreateTransactionFail(err){
      var MESSAGE_SAVED = 'خطا! ' + err.response.data.message;
      this.saveToast.text(MESSAGE_SAVED).goAway(1700);
      this.isLoading = false;
    },
    goToList() {
      this.$router.push({path: '/distribution/list'});
    },
  },
  created() {
    this.token = localStorage.token;
    if (!this.token) {
        this.$router.push({path: '/login'});
    }

    this.isLoading = true;
    RemittanceService.get(this.token,this.remittanceId)
      .then(response => {
        this.remittance = response.data.remittance;
        this.isLoading = false;
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err)
      })
 }

};
