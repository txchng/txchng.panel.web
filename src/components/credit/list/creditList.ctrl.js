import CreditListItem from '@/components/credit/listItem/creditListItem.vue';

export default {
  name: 'CreditList',
  components:{ CreditListItem },
  props:["creditList"],
  methods: {
    backToList() {
      this.$router.push({path: '/company'})
    },
  },
}
