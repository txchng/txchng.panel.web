import CurrencySelect from '@/components/share/currencySelect/currencySelect.vue';
import CoWorkerSelect from '@/components/share/coWrokerSelect/coWorkerSelect.vue';

import WageRestResource from '@/util/http/wage.srv';

const WageService = new WageRestResource();

export default {
  name: 'AddWageModal',
  props: ["token"],
  components: { CurrencySelect, CoWorkerSelect },
  data() {
    return {
      wageList: [],
      wage: { coWorkerCompanyId: '', currencyId: '', minPrice: 0, maxPrice: 0, price: 0 },
    }
  },
  methods :{
    setCurrency(selectedCurrency){
      this.wage.currencyId = selectedCurrency;
    },
    setCoWorkerCompany(selectedCoWorkerCompany){
      console.log(selectedCoWorkerCompany);
      this.wage.coWorkerCompanyId = selectedCoWorkerCompany;
    },
    save() {
      WageService
        .add(this.token, this.wage)
        .then(this.onSaveSuccess)
        .catch(this.onSaveFail);
    },
    onSaveSuccess(response){
      this.wageList = response.data.wageList
    },
    onSaveFail(err){
      console.log(err)
    }
  },
  created() {
  }
}
