import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue'
import WageLable from '@/components/wage/label/wageLabel.vue'
import DateTimeLabel from '@/components/share/label/dateTime/dateTimeLable.vue'
import RemittanceStatusIcon from '@/components/remittance/statusIcon/remittanceStatusIcon.vue'
import UserLabel from '@/components/user/label/userLabel.vue'
import PriceLabel from '@/components/share/label/price/priceLabel.vue';

export default {
    name: 'RemittanceListItem',
    components: {
      CurrencyLabel,
      WageLable,
      DateTimeLabel,
      UserLabel,
      RemittanceStatusIcon,
      PriceLabel
    },
    props: {
        index: Number,
        remittance: Object,
        onDeliveredSelectedMethod: {type: Function},
        onReverseSelectedMethod: {type: Function},
    },
    computed: {
        bgColor: function () {
            return this.index % 2 === 0 ? '' : 'bg-light-blue';
        }
    },
    methods: {
        delivered() {
            this.onDeliveredSelectedMethod(this.remittance);
            console.log('this.remittance', this.remittance._id)
            this.$router.push({path: '/remittance/assignCompany/' + this.remittance._id})
        },
    },
}
