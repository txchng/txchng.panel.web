import PriceInput from '@/components/share/input/price/priceInput.vue';
import UserPanel from '@/components/user/panel/userPanel.vue';
import UserInput from '@/components/user/input/userInput.vue';

import CompanyRestResource from '@/util/http/company.srv';
import TransactionRestResource from '@/util/http/transaction.srv';

const CompanyService = new CompanyRestResource();
const TransactionService = new TransactionRestResource();

export default {
  name: "AddTransaction",
  components: {PriceInput, UserPanel, UserInput},
  data() {
      return {
          currencyList: [],
          token: undefined,
          receiver: undefined,
          transaction: { price: undefined, currencyId: undefined ,description:undefined, type:"1"},
          receiverPositionTitle: 'receiver',
          isLoading: false,

      }
  },
  methods:{
    clearForm(){
      this.transaction.price = undefined;
      this.transaction.currencyId = undefined;
      this.receiver = undefined;
      this.transaction.description = undefined;
    },
    setPrice(price, currencyId) {
        this.transaction.price = price;
        this.transaction.currencyId = currencyId;
    },
    setReceiverUser(user){
      this.receiver = user;
    },
    getCompanyCurrencList() {
        this.isLoading = true;
        CompanyService
            .getAllCurrencyList(this.token)
            .then(this.onGetCompanyCurrencListSuccess)
            .catch(this.onGetCompanyCurrencListFail);
    },
    onGetCompanyCurrencListSuccess(response) {
      this.isLoading = false;
      this.currencyList = response.data.currencyList;
    },
    onGetCompanyCurrencListFail(err) {
      this.isLoading = false;
      alert(err.response.data.message);
    },
    createTransaction(){
      let finalPrice = parseInt(this.transaction.type) * this.transaction.price;
      this.isLoading = true;
      var MESSAGE_SAVEING = 'فی حالة التخزین ...';
      this.saveToast = this.$toasted.show(MESSAGE_SAVEING, {
          type: 'info',
      });
      TransactionService
        .create(this.token, finalPrice, this.transaction.currencyId, this.receiver._id, this.transaction.description)
        .then(this.onCreateTransactionSuccess)
        .catch(this.onCreateTransactionFail);
    },
    onCreateTransactionSuccess(response){
      this.isLoading = false;
      console.log(response.data.transaction);
      var MESSAGE_SAVED = 'خزّنت!'
      this.saveToast.text(MESSAGE_SAVED).goAway(1700);
      this.refresh();
    },
    onCreateTransactionFail(err){
      var MESSAGE_SAVED = 'خطا! '+ err.response.data.message;
      this.saveToast.text(MESSAGE_SAVED).goAway(1700);
      this.isLoading = false;
    },
    goToList() {
      this.$router.push({path: '/transaction/list'});
    },
    refresh(){
      this.clearForm();
      //this.$forceUpdate();
      this.$router.go(0);
    }

  },
  computed: {
    isValidForm(){
      if(
        this.transaction.price!=undefined &&
        this.transaction.currencyId &&
        this.receiver
      ){
        console.log('trrue');
        return true;
      }else {
        console.log('false');
        return false;
      }

    },
  },
  created() {
      this.token = localStorage.token;
      if (!this.token) {
          this.$router.push({path: '/login'})
      }
      this.getCompanyCurrencList();
  },
};
