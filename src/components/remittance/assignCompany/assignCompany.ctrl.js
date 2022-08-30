import CompanyRestResource from '@/util/http/company.srv';
import RemittanceRestResource from '@/util/http/remittance.srv';
import RemittanceSummaryCart from '@/components/remittance/summaryCart/remittanceSummaryCart.vue';
import CurrencySelect from '@/components/share/currencySelect/currencySelect.vue'
import WageInput from '@/components/wage/input/wageInput.vue';

const CompanyService = new CompanyRestResource();
const RemittanceService = new RemittanceRestResource();


export default {
    name: 'AssignCompany',
    components: {CurrencySelect, WageInput, RemittanceSummaryCart},
    props: ["remittanceId"],
    title: 'XCHNG | عیین الشرکة الزمیلة',

    data() {
        return {
            selectedIntermediateCompany: undefined,
            distributorCompanyWage: {price: undefined, currencyId: undefined},
            companyList: [],
            token: undefined,
            company: {},
            remittance: undefined,

        }
    },
    methods: {
        setCurrency(selectedCurrencyId) {
            this.distributorCompanyWage.currencyId = selectedCurrencyId;
        },
        getRemittanceDetail(){
          RemittanceService
              .get_intermediateCompany_remittanceId(this.token, this.remittanceId)
              .then(this.onGetRemittanceDetailSuccess)
              .catch(this.onGetRemittanceDetailFail);
        },
        onGetRemittanceDetailSuccess(response){
          this.remittance = response.data.remittance;
          this.distributorCompanyWage.currencyId = this.remittance.currency._id;
        },
        onGetRemittanceDetailFail(err){
          console.log(err)
          var MESSAGE_SAVE_FAILE = 'خطا: ' + err.message;
          this.$toasted.show(MESSAGE_SAVE_FAILE, {
            type: 'info',
            duration: 1700
          });
        },
        setDisterbuterCompany() {
            var MESSAGE_SAVEING = 'فی حالة التخزین ...';
            this.saveToast = this.$toasted.show(MESSAGE_SAVEING, {
                type: 'info',
            });
            RemittanceService
                .setDisterbuterCompany(this.token, this.selectedIntermediateCompany, this.distributorCompanyWage, this.remittanceId)
                .then(this.onSetDistributorCompanySuccess)
                .catch(this.onSetDistributionCompanyFail);
        },
        onSetDistributorCompanySuccess(response) {
          console.log(response);
            var MESSAGE_SAVED = 'خزّنت!'
            this.saveToast.text(MESSAGE_SAVED).goAway(1700);
            this.backToList();
        },
        onSetDistributionCompanyFail(err) {
            console.log(err)
            var MESSAGE_SAVE_FAILE = 'خطا: ' + err.message;
            this.saveToast.text(MESSAGE_SAVE_FAILE).goAway(700);
        },
        getCoWorkertCompanyList() {
            CompanyService
                .getCoWorkerCompanyList(this.token)
                .then(this.onGetCoWorkertCompanyListSuccess)
                .catch(this.onGetCoWorkertCompanyListFail);
        },
        onGetCoWorkertCompanyListSuccess(response) {
            this.companyList = response.data.companyList;
        },
        onGetCoWorkertCompanyListFail(err) {
            alert(err.response.data.message);
        },
        setWage(wagePrice) {
          this.distributorCompanyWage.price = parseInt(wagePrice);
        },
        backToList() {
          this.$router.push({path: '/remittance/list'})
        },
    },
    computed: {
      isValidForm() {
        if(
          this.remittance &&
          this.selectedIntermediateCompany &&
          this.distributorCompanyWage.price
        ){
          return true;
        }
        return false;
      }
    },
    created() {
        this.token = localStorage.token;
        if (!this.token) {
            this.$router.push({path: '/login'})
        }
        this.getCoWorkertCompanyList();
        this.getRemittanceDetail();
    },
}
