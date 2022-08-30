import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue'
import DateTimeLabel from '@/components/share/label/dateTime/dateTimeLable.vue'
import PriceLabel from '@/components/share/label/price/priceLabel.vue';

export default {
    name: 'CreditListItem',
    props: ["credit", "index"],
    components: {
      CurrencyLabel,
      DateTimeLabel,
      PriceLabel
    },
    computed: {
        bgColor: function () {
            return this.index % 2 === 0 ? '' : 'bg-light-blue';
        }
    },
    methods: {
        backToList() {
            this.$router.push({path: '/company'})
        },
        showRemittanceDetail() {
            this.$router.push({path: '/remittance/detail/' + this.credit.remittance._id})
        }
    },
}
