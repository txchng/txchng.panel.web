import RequestRestResource from '@/util/http/request.srv';
const RequestService = new RequestRestResource();

import WageInput from '@/components/wage/input/wageInput.vue';
import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue'
import requestSummaryCart from '@/components/request/summaryCart/requestSummaryCart.vue';

export default {
  name: 'SetWageModal',
  props: {
    token: String,
    request: Object,
    onCloseMethod: {type: Function},
  },
  components: {
    WageInput,
    CurrencyLabel,
    requestSummaryCart
  },
  data() {
    return {
      wage: {wagePrice: 0 },
    }
  },
  methods :{
    close(){
      this.onCloseMethod();
    },

    setWagePrice(wagePrice){
        this.wage.wagePrice = wagePrice;
    },

    save() {
      RequestService
      .setWage(this.token, this.wage.wagePrice, this.request.currency, this.request._id)
      .then(this.onSetWageSuccess)
      .catch(this.onSetWageFail);
    },
    onSetWageSuccess(response){
      console.log(response.data.request);
      this.onCloseMethod(true);
    },
    onSetWageFail(err){
      console.log(err)
    },
  },
  created() {},
}
