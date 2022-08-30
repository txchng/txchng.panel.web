import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue'
import WageLable from '@/components/wage/label/wageLabel.vue'
import DateTimeLabel from '@/components/share/label/dateTime/dateTimeLable.vue'
import UserLabel from '@/components/user/label/userLabel.vue'
import DistributionStatusIcon from '@/components/distribution/statusIcon/distributionStatusIcon.vue'
import PriceLabel from '@/components/share/label/price/priceLabel.vue';

export default {
  name: 'DistributionListItem',
  components:{
    CurrencyLabel,
    WageLable,
    DateTimeLabel,
    UserLabel,
    DistributionStatusIcon,
    PriceLabel
  } ,
  props:{
    index:Number,
    remittance: Object,
    onDeliveredSelectedMethod: { type: Function },
    onReverseSelectedMethod: { type: Function },
  },
  computed: {
    bgColor: function () {
      return this.index%2===0 ? '' : 'bg-light-blue';
    }
  },
  methods:{
    delivered(){
      console.log('herer');
      this.onDeliveredSelectedMethod(this.remittance);
    },
    reverse(){
      this.onReverseSelectedMethod(this.remittance);
    },
    printReceipt(){
      console.log('print document');
    }
  },
}
