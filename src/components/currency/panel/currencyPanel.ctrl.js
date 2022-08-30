import CurrencyRestResource from '@/util/http/currency.srv';
import CompanyRestResource from '@/util/http/company.srv';

const CurrencyService = new CurrencyRestResource();
const CompanyService = new CompanyRestResource();

import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue';
import LoadingList from '@/components/share/loading/list/loadingList.vue';

export default {
  name: 'CurrencyPanel',
  title: 'سامانه تبادل مشتری | مدیریت واحد پولی',

  data() {
    return {
      currencyList: [],
      companyCurrencyList: [],
      token: undefined,
      isLoadingCurrencyList: false,
      isLoadingCompanyCurrencyList: false,
    }
  },
  components:{
    CurrencyLabel,
    LoadingList,
  },
  methods: {
    backToList() {
      this.$router.push({path: '/company'})
    },
    addCurrency(currencyId) {
      CurrencyService
      .addToCompany(this.token, currencyId)
      .then(this.onAddCurrencySuccess)
      .catch(this.onAddCurrencyFail);
    },
    onAddCurrencySuccess(response){
      this.currencyList = response.data.currencyList
    },
    onAddCurrencyFail(err){
      console.log(err)
    },
    removeCurrency(currencyId) {
      CurrencyService
      .removeFromCompany(this.token, currencyId)
      .then(this.onRemoveCurrencySuccess)
      .catch(this.onRemoveCurrencyFail);
    },
    onRemoveCurrencySuccess(response){
      this.currencyList = response.data.currencyList
    },
    onRemoveCurrencyFail(err){
      console.log(err)
    },
    getAllCurrency() {
      this.isLoadingCurrencyList = true;
      CurrencyService
      .getAll(this.token)
      .then(this.onGetAllCurrencySuccess)
      .catch(this.onGetAllCurrencyFail);
    },
    onGetAllCurrencySuccess(response){
      this.isLoadingCurrencyList = false;
      this.currencyList = response.data.currencyList;
    },
    onGetAllCurrencyFail(err){
      this.isLoadingCurrencyList = false;
      alert(err.response.data.message);
    },
    getCompanyCurrencList() {
      this.isLoadingCompanyCurrencyList = true;
      CompanyService
      .getAllCurrencyList(this.token)
      .then(this.onGetCompanyCurrencListSuccess)
      .catch(this.onGetCompanyCurrencListFail);
    },
    onGetCompanyCurrencListSuccess(response){
      this.isLoadingCompanyCurrencyList = false;
      this.companyCurrencyList = response.data.currencyList;
    },
    onGetCompanyCurrencListFail(err){
      this.isLoadingCompanyCurrencyList = false;
      alert(err.response.data.message);
    },
  },
  created() {
    this.token = localStorage.token;
    if (!this.token) {
        this.$router.push({path: '/login'});
    }
    this.getAllCurrency();
    this.getCompanyCurrencList();
 }
}
