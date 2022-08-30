import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue'
import WageLable from '@/components/wage/label/wageLabel.vue'
import DateTimeLabel from '@/components/share/label/dateTime/dateTimeLable.vue'
import UserLabel from '@/components/user/label/userLabel.vue'
import PriceLabel from '@/components/share/label/price/priceLabel.vue';

export default {
  name: 'distributionSummaryCart',
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
  methods: {
    getAttachmentUrl(attachmentFileName){
      return 'http://116.203.75.73:8002/remittance/getAttachment/' + this.token + '/' + attachmentFileName;
    }
  },
  created() {
    this.token = localStorage.token;
    if(!this.token){
      this.$router.push({path: '/login'});
    }
  }
}
