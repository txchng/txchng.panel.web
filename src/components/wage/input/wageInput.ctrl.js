export default {
  name: 'WageInput',
  props: {
    price: Number,
    onWagePriceSelectedMethod: { type: Function }
  },
  components: {},
  data() {
    return {
      wagePrice: undefined,
      wagePercentage: undefined,
    };
  },
  methods :{
    calculateFromPrice(){
      this.wagePercentage = this.wagePrice * 100 / this.price;
      this.setWagePriceOnParetn();
    },
    calculateFromPercentage(){
      this.wagePrice = this.wagePercentage * this.price / 100;
      this.setWagePriceOnParetn();
    },
    setWagePriceOnParetn(){
      if(this.onWagePriceSelectedMethod){
        this.onWagePriceSelectedMethod(this.wagePrice);
      }
    }
  },
  computed: {
    isDisabled() {
      if(!this.price){
        return true;
      }
      return false;
    }
  }
};
