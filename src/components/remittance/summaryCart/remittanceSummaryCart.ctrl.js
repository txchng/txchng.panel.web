import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue'
import WageLable from '@/components/wage/label/wageLabel.vue'
import DateTimeLabel from '@/components/share/label/dateTime/dateTimeLable.vue'
import UserLabel from '@/components/user/label/userLabel.vue'
import PriceLabel from '@/components/share/label/price/priceLabel.vue';

export default {
  name: 'remittanceSummaryCart',
  components:{
    CurrencyLabel,
    WageLable,
    DateTimeLabel,
    UserLabel,
    PriceLabel
  } ,
  props:{
    remittance: Object,
  },
}
