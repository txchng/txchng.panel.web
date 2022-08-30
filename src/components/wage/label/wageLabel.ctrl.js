import PriceLabel from '@/components/share/label/price/priceLabel.vue';

export default {
  name: 'WageLabel',
  components:{
    PriceLabel
  } ,
  props: {
    price: Number,
    wagePrice: Number,
  },
  computed:{
    percentage: function(){
      if(
        this.wagePrice != undefined &&
        this.price != undefined
      ){
        return this.wagePrice * 100 / this.price;
      }
    },
    roundPercentage: function(){
      if(
        this.wagePrice != undefined &&
        this.price != undefined
      ){
          return (this.wagePrice * 100 / this.price).toFixed(2)
      }
    },
  },
}
