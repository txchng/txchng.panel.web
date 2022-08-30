export default {
  name: 'CurrencySelect',
  props: {
    currencyList : Array,
    onCurrencySelectedMethod: { type: Function }
  },
  methods:{
    onCurrencySelected(event) {
      if(this.onCurrencySelectedMethod){
        this.onCurrencySelectedMethod(event.target.value);
      }
    },
  },
  data() {
    return {
      selectedCurrency:{},
    }
  },
}
