export default {
  name: 'PriceLabel',
  props:["price"],
  computed: {
    formatedPrice: function () {
      return this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
};
