import TransactionList from '@/components/transaction/list/transactionList.vue';
import LoadingList from '@/components/share/loading/list/loadingList.vue';
import DateSelectorInput from '@/components/share/input/dateSelectore/dateSelectorInput.vue';

import TransactionRestResource from '@/util/http/transaction.srv';
const TransactionService = new TransactionRestResource();

export default {
  name: 'TransactionPanel',
  components:{
    TransactionList,
    LoadingList,
    DateSelectorInput
  },
  title: 'سامانه تبادل مشتری | تراکنش ها',

  data() {
    return {
      transactionList: [],
      token: undefined,
      isLoading: false,
    }
  },
  methods: {
    setDateTime(fromDateTime, toDateTime){
      this.getTransactionList(fromDateTime, toDateTime);
    },
    backToList() {
      this.$router.push({path: '/company'})
    },
    getTransactionList(fromDateTime, toDateTime) {
      this.isLoading = true;

      TransactionService
      .getAllByDateTimeRange(this.token, fromDateTime, toDateTime)
      .then(this.onGetTransactionListSuccsess)
      .catch(this.onGetTransactionListFail)

    },
    onGetTransactionListSuccsess(response){
      this.isLoading = false;
      this.transactionList = response.data.transactionList;
    },
    onGetTransactionListFail(err){
      this.isLoading = false;
      alert(err.response.data.message);
    }
  },
  created() {
    this.token = localStorage.token;
    if(!this.token){
      this.$router.push({path: '/login'})
    }
 }
}
