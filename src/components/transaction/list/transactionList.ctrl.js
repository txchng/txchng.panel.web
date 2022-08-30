import TransactionListItem from '@/components/transaction/listItem/transactionListItem.vue';
export default {
  name: 'TransactionList',
  components:{ TransactionListItem },
  props:["transactionList"],
  methods: {
    backToList() {
      this.$router.push({path: '/company'})
    },
  },
}
