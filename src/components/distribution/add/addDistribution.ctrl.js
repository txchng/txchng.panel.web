import CompanyRestResource from '@/util/http/company.srv';
import RemittanceRestResource from '@/util/http/remittance.srv';

const CompanyService = new CompanyRestResource();
const RemittanceService = new RemittanceRestResource();

import WageInput from '@/components/wage/input/wageInput.vue';
import PriceInput from '@/components/share/input/price/priceInput.vue';
import UserPanel from '@/components/user/panel/userPanel.vue';
import UserInput from '@/components/user/input/userInput.vue';


export default {
    name: 'AddDistribution',
    components: {PriceInput, WageInput, UserPanel, UserInput},
    props: ["companyId"],
    title: 'سامانه تبادل مشتری | ثبت حواله وارده',

    data() {
        return {
            selectedIntermediateCompany: undefined,
            currencyList: [],
            coworkerCompanyList: [],
            token: undefined,
            receiver: undefined,
            remittance: { price: undefined, currencyId: undefined },
            distributorCompanyWage: { price: undefined, currencyId: undefined },
            receiverPositionTitle: 'receiver',
        }
    },
    methods: {
        setReceiverUser(user) {
            console.log('setReceiverUser');
            console.log(user);
            this.receiver = user
        },
        setPrice(price, currencyId) {
            this.remittance.price = price;
            this.remittance.currencyId = currencyId;
            this.distributorCompanyWage.currencyId = currencyId;
        },
        setWage(wagePrice) {
            this.distributorCompanyWage.price = parseInt(wagePrice);
        },
        backToList() {
            this.$router.push({path: '/distribution/list'})
        },
        createDistribution() {
            var MESSAGE_SAVEING = 'فی حالة التخزین ...';
            this.saveToast = this.$toasted.show(MESSAGE_SAVEING, {
                type: 'info',
            });
            RemittanceService
                .addDistribution(this.token, this.receiver, this.remittance, this.selectedIntermediateCompany, this.distributorCompanyWage)
                .then(this.onCreateDistributionSuccess)
                .catch(this.onCreateDistributionFail);
        },
        onCreateDistributionSuccess(response) {
            console.log(response.data);
            var MESSAGE_SAVED = 'خزّنت!'
            this.saveToast.text(MESSAGE_SAVED).goAway(1700);
            this.clearForm();
            this.backToList();
        },
        onCreateDistributionFail(err) {
            console.log(err)
            var MESSAGE_SAVE_FAILE = 'خطا: ' + err.message;
            this.saveToast.text(MESSAGE_SAVE_FAILE).goAway(700);
        },
        clearForm() {
            this.selectedIntermediateCompany = {};
            this.receiver = undefined;
            this.remittance.price = 0;
            this.remittance.currencyId = '';
            this.distributorCompanyWage.price = 0;
            this.distributorCompanyWage.currencyId = '';
        },
        getCompanyCurrencList() {
            CompanyService
                .getAllCurrencyList(this.token)
                .then(this.onGetCompanyCurrencListSuccess)
                .catch(this.onGetCompanyCurrencListFail);
        },
        onGetCompanyCurrencListSuccess(response) {
            this.currencyList = response.data.currencyList
        },
        onGetCompanyCurrencListFail(err) {
            console.log(err)
        },
        getCoWorkerList() {
            CompanyService
                .getCoWorkerCompanyList(this.token)
                .then(this.onGetCoWorkerListSuccess)
                .catch(this.onGetCoWorkerListFail)
        },
        onGetCoWorkerListSuccess(response) {
            this.coworkerCompanyList = response.data.companyList;
        },
        onGetCoWorkerListFail(err) {
            console.log(err)
        }
    },
    computed: {
      isValidForm() {
        if(
          this.selectedIntermediateCompany &&
          this.receiver &&
          this.remittance.price &&
          this.remittance.currencyId &&
          this.distributorCompanyWage.price &&
          this.distributorCompanyWage.currencyId
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
        this.getCoWorkerList();
        this.getCompanyCurrencList();
    },
}
