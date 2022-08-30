import PriceInput from '@/components/share/input/price/priceInput.vue';
import CoWorkerSelect from '@/components/share/coWrokerSelect/coWorkerSelect.vue';

import CompanyRestResource from '@/util/http/company.srv';
import CreditRestResource from '@/util/http/credit.srv';

const CompanyService = new CompanyRestResource();
const CreditService = new CreditRestResource();

export default {
  name: "AddCredit",
  components: {PriceInput, CoWorkerSelect},
  data() {
      return {
          currencyList: [],
          token: undefined,
          coworkerId: undefined,
          credit: { price: undefined, currencyId: undefined ,description:undefined, type:"1"},
          isLoading: false,

      }
  },
  methods:{
    clearForm(){
      this.credit.price = undefined;
      this.credit.currencyId = undefined;
      this.credit.description = undefined;
      this.coworker = undefined;
    },
    setPrice(price, currencyId) {
        this.credit.price = price;
        this.credit.currencyId = currencyId;
    },
    setCoworker(coworkerId){
      this.coworkerId = coworkerId;
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
    createCredit(){
      let finalPrice = parseInt(this.credit.type) * this.credit.price;
      this.isLoading = true;
      var MESSAGE_SAVEING = 'فی حالة التخزین ...';
      this.saveToast = this.$toasted.show(MESSAGE_SAVEING, {
          type: 'info',
      });
      CreditService
        .create(this.token, finalPrice, this.credit.currencyId, this.coworkerId, this.credit.description)
        .then(this.onCreateCreditSuccess)
        .catch(this.onCreateCreditFail);
    },
    onCreateCreditSuccess(response){
      this.isLoading = false;
      console.log(response.data.credit);
      var MESSAGE_SAVED = 'خزّنت!'
      this.saveToast.text(MESSAGE_SAVED).goAway(1700);
      this.refresh();
    },
    onCreateCreditFail(err){
      var MESSAGE_SAVED = 'خطا! ' + err.response.data.message
      this.saveToast.text(MESSAGE_SAVED).goAway(1700);
      this.isLoading = false;
    },
    goToList() {
      this.$router.push({path: '/credit/list'});
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
        this.credit.price!=undefined &&
        this.credit.currencyId &&
        this.coworkerId
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
