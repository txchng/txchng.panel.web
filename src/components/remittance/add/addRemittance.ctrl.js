import CompanyRestResource from '@/util/http/company.srv';
import RemittanceRestResource from '@/util/http/remittance.srv';

const CompanyService = new CompanyRestResource();
const RemittanceService = new RemittanceRestResource();

import WageInput from '@/components/wage/input/wageInput.vue';
import PriceInput from '@/components/share/input/price/priceInput.vue';
import AssignDistributorCompanyModal from '@/components/remittance/assignDistributorCompanyModal/assignDistributorCompanyModal.vue';
import SendDistributionRequestModal from '@/components/remittance/sendDistributionRequestModal/sendDistributionRequestModal.vue'
import UserPanel from '@/components/user/panel/userPanel.vue'

export default {
  name: 'AddRemittance',
  components: {UserPanel, PriceInput , WageInput, AssignDistributorCompanyModal, SendDistributionRequestModal },
  props:["companyId"],
  title: 'سامانه تبادل مشتری | ثبت حواله صادره',

  data() {
    return {
      token : undefined,
      currencyList:[],
      applicant: undefined,
      receiver : undefined,
      remittance: { price: undefined ,currencyId: undefined, currency: undefined, intermediateCompanyWagePrice: undefined, intermediateCompanyWageCurrencyId:undefined, intermediateCompanyWageCurrency:undefined },
      applicantPositionTitle: 'applicant',
      receiverPositionTitle: 'receiver',
    }
  },
  methods: {
    setApplicantUser(user){
      this.applicant = user;
    },
    setReceiverUser(user){
      this.receiver = user
    },
    setPrice(price, currencyId){
      this.remittance.price = price;
      this.remittance.currencyId = currencyId;
      this.remittance.intermediateCompanyWageCurrencyId = currencyId;
    },
    setWage(wagePrice){
      this.remittance.intermediateCompanyWagePrice = wagePrice;
    },
    backToList() {
      this.$router.push({path: '/remittance/list'})
    },
    goToAssignCompany(remittanceId) {
      this.$router.push({path: '/remittance/assignCompany/'+remittanceId});
    },
    createRemittance() {
      var MESSAGE_SAVEING = 'فی حالة التخزین ...';
      this.saveToast = this.$toasted.show(MESSAGE_SAVEING, {
          type: 'info',
      });
      RemittanceService
      .add(this.token, this.applicant, this.receiver, this.remittance)
      .then(this.onCreateRemittanceSuccess)
      .catch(this.onCreateRemittanceFail);
    },
    onCreateRemittanceSuccess(response){
      var MESSAGE_SAVED = 'خزّنت!'
      this.saveToast.text(MESSAGE_SAVED).goAway(1700);
      this.remittance = response.data.remittance;
      this.goToAssignCompany(this.remittance._id)
    },
    onCreateRemittanceFail(err){
      console.log(err)
      var MESSAGE_SAVE_FAILE = 'خطا: ' + err.message;
      this.saveToast.text(MESSAGE_SAVE_FAILE).goAway(700);
    },
    getCompanyCurrencList() {
      CompanyService
      .getAllCurrencyList(this.token)
      .then(this.onGetCompanyCurrencListSuccess)
      .catch(this.onGetCompanyCurrencListFail);
    },
    onGetCompanyCurrencListSuccess(response){
      this.currencyList = response.data.currencyList;
    },
    onGetCompanyCurrencListFail(err){
      alert(err.response.data.message);
    },
  },
  computed: {
    isValidRemittance() {
      if(
        this.applicant &&
        this.receiver &&
        this.remittance.price &&
        this.remittance.intermediateCompanyWagePrice
      ){
        return true;
      }
      return false;
    }
  },
  created() {
    this.token = localStorage.token;
    if(!this.token){
      this.$router.push({path: '/login'})
    }
    this.getCompanyCurrencList();

  },
}
