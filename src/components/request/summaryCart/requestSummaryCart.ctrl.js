import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue'
import DateTimeLabel from '@/components/share/label/dateTime/dateTimeLable.vue'
import PriceLabel from '@/components/share/label/price/priceLabel.vue';

import moment from 'moment';

export default {
  name: 'requestSummaryCart',
  components:{
    CurrencyLabel,
    DateTimeLabel,
    PriceLabel
  } ,
  props:{
    request: Object,
  },
  data() {
    return {
      date: undefined,
      time: undefined,
    }
  },
  created(){
    this.date = moment(this.request.createAt).format('YYYY/MM/d');
    this.time = moment(this.request.createAt).format('HH:mm');
  }
}
