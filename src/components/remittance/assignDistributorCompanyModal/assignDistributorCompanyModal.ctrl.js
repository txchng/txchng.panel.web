import CompanyRestResource from '@/util/http/company.srv';
import RemittanceRestResource from '@/util/http/remittance.srv';

const CompanyService = new CompanyRestResource();
const RemittanceService = new RemittanceRestResource();

import CurrencySelect from '@/components/share/currencySelect/currencySelect.vue'

export default {
  name: 'AssignDistributorCompanyModal',
  components: {CurrencySelect},
  props:["remittanceId","token"],
  data() {
    return {
      selectedDistributorCompany: {},
      distributorCompanyWage: { price: 0, currencyId: '' },
      companyList: [],
      token: undefined,
    }
  },
  methods: {
    setCurrency(selectedCurrencyId){
      this.distributorCompanyWage.currencyId = selectedCurrencyId;
    },
    backToList() {
      this.$router.push({path: '/company'});
    },
    setDisterbuterCompany() {
      RemittanceService
      .setDisterbuterCompany(this.token, this.selectedDistributorCompany, this.distributorCompanyWage, this.remittanceId)
      .then(this.onSetDistributorCompanySuccess)
      .catch(this.onSetDistributionCompanyFail);
    },
    onSetDistributorCompanySuccess(response){
      alert('saved!')
      this.remittance = response.data.remittance;
    },
    onSetDistributionCompanyFail(err){
      alert(err.response.data.message);
    },
    getCoWorkertCompanyList(){
      CompanyService
      .getCoWorkerCompanyList(this.token)
      .then(this.onGetCoWorkertCompanyListSuccess)
      .catch(this.onGetCoWorkertCompanyListFail);
    },
    onGetCoWorkertCompanyListSuccess(response){
      this.companyList = response.data.companyList;
    },
    onGetCoWorkertCompanyListFail(err){
      alert(err.response.data.message);
    },
  },
  created() {
    this.getCoWorkertCompanyList();
  },
}
