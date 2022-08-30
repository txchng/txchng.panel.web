import requestSummaryCart from '@/components/request/summaryCart/requestSummaryCart.vue';

export default {
  name: 'ConfirmRejectRequestModal',
  props: {
    request: Object,
    onCancelMethod: {type: Function},
    onConfirmMethod: {type: Function},
  },
  components:{
    requestSummaryCart
  },
  methods :{
    close(){
      this.onCancelMethod();
    },

    confirm() {
      this.onConfirmMethod(this.request);
    },
  },
  created() {
    console.log('here to reject in conffirm modal');
    console.log(this.request);
  }
}
