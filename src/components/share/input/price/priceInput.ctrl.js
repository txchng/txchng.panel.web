import CurrencySelect from '@/components/share/currencySelect/currencySelect.vue';

export default {
  name: 'PriceInput',
  props: {
    currencyList : Array,
    onValidPriceSelectedMethod: { type: Function }
  },
  components:{
    CurrencySelect,
  },
  data() {
    return {
      price: undefined,
      currencyId: undefined,
    }
  },
  methods:{
    setCurrency(selectedCurrencyId){
      this.currencyId = selectedCurrencyId;
      this.setResultOnParrent();
    },
    onPriceSet(){
      console.log(this.price);
      this.setResultOnParrent();
    },
    isValidPrice(){
      if(
        this.price != undefined &&
        this.currencyId != undefined
      ){
        return true;
      }
      return false;
    },
    setResultOnParrent(){
      if(this.isValidPrice()){
        this.onValidPriceSelectedMethod(parseInt(this.price), this.currencyId)
      }
    }
  }
}
