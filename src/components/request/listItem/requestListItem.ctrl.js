import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue';
import RequestStatusIcon from '@/components/request/statusIcon/requestStatusIcon.vue'
import DateTimeLabel from '@/components/share/label/dateTime/dateTimeLable.vue'
import PriceLabel from '@/components/share/label/price/priceLabel.vue';

export default {
  name: 'RequestListItem',
  props:{
    index:Number,
    request: Object,
    onSetRequestWageSelectedMethod: { type: Function },
    onRequestRejectSelectedMethod: { type: Function },
  },
  components:{
    CurrencyLabel,
    RequestStatusIcon,
    DateTimeLabel,
    PriceLabel
  },
  computed: {
    bgColor: function () {
      return this.index%2===0 ? '' : 'bg-light-blue';
    }
  },
  methods: {
    setRequestWage() {
      this.onSetRequestWageSelectedMethod(this.request);
    } ,
    rejectRequest() {
      this.onRequestRejectSelectedMethod(this.request);
    }
  },
}
