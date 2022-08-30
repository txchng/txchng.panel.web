import RemittanceRestResource from '@/util/http/remittance.srv';

const RemittanceService = new RemittanceRestResource();

import DistributionList from '@/components/distribution/list/distributionList.vue';
import ConfirmReverseDistributionModal from '@/components/distribution/confirmReverseModal/confirmReverseDistributionModal.vue';
import SubmitDisterbutionDeliveryModal from '@/components/distribution/submitDelivery/submitDisterbutionDeliveryModal.vue';
import LoadingList from '@/components/share/loading/list/loadingList.vue'
import DistributionFilter from '@/components/distribution/filter/distributionFilter.vue'
import DateSelectorInput from '@/components/share/input/dateSelectore/dateSelectorInput.vue';

export default {
  name: 'DistributionPanel',
  components:{
    DistributionList,
    ConfirmReverseDistributionModal,
    SubmitDisterbutionDeliveryModal,
    LoadingList,
    DistributionFilter,
    DateSelectorInput
  },
  props:["remittanceId"],
  title: 'XCHNG | طلبات المتفق علیها',

  data() {
    return {
      isLoading: false,
      isJustNew:false,
      remittanceList: [],
      visibleRemittanceList: [],
      selectedReveresRemittance: undefined,
      showReverseRemittanceConfirmModal:false,
      selectedDeliveredRemittance: undefined,
      showSubmitDeliveredRemittanceModal: false,
      filterObject:{
        status : undefined,
        searchKeyword : undefined,
      }
    }
  },
  methods: {
    setDateTime(fromDateTime, toDateTime){
      this.getAllDistributionList(fromDateTime, toDateTime);
    },
    filteChanged(status, searchKeyword){
      console.log('selectedStatus');
      console.log(status);
      console.log('seachKeyword');
      console.log(searchKeyword);
      this.filterObject.status = status;
      this.filterObject.searchKeyword = searchKeyword;
      this.visibleRemittanceList = this.filterRequestList(this.remittanceList, this.filterObject);
    },
    showSubmitDeliveryDistributionModal(remittance) {
      this.selectedDeliveredRemittance = remittance;
      this.showSubmitDeliveredRemittanceModal = true;
    },

    hideSubmitDeliveryDistributionModal() {
      this.selectedDeliveredRemittance = undefined;
      this.showSubmitDeliveredRemittanceModal = false;
    },

    showReverseDistributionConfrimModal(remittance) {
      this.selectedReveresRemittance = remittance;
      this.showReverseRemittanceConfirmModal = true;
    },

    hideReverseDistributionConfrimModal() {
      this.selectedReveresRemittance = undefined;
      this.showReverseRemittanceConfirmModal = false;
    },

    reverseDistribution(){
      var MESSAGE_SAVEING = 'فی حالة التخزین ...';
      this.reverseToast = this.$toasted.show(MESSAGE_SAVEING, {
          type: 'info',
      });
      RemittanceService
      .reverseDistribution(this.token, this.selectedReveresRemittance._id)
      .then(this.onReverseDistributionSuccess)
      .catch(this.onReverseDistributionFail);
    },
    onReverseDistributionSuccess(response){
      var MESSAGE_SAVED = 'خزّنت!'
      this.reverseToast.text(MESSAGE_SAVED).goAway(1700);
      console.log(response.data.remittance);
      //this.request = response.data.request
      this.hideReverseDistributionConfrimModal();
      this.getAllDistributionList();
    },
    onReverseDistributionFail(err){
      console.log(err)
      var MESSAGE_SAVE_FAILE = 'خطا: ' + err.message;
      this.reverseToast.text(MESSAGE_SAVE_FAILE).goAway(700);
    },

    deliveredDistribution(){
      var MESSAGE_SAVEING = 'فی حالة التخزین ...';
      this.deliveryToast = this.$toasted.show(MESSAGE_SAVEING, {
          type: 'info',
      });
      RemittanceService
      .deliveredDistribution(this.token, this.selectedDeliveredRemittance._id)
      .then(this.onDeliveredDistributionSuccess)
      .catch(this.onDeliveredDistributionFail);
    },
    onDeliveredDistributionSuccess(response){
      var MESSAGE_SAVED = 'خزّنت!'
      this.deliveryToast.text(MESSAGE_SAVED).goAway(1700);
      console.log(response.data.remittance);
      //this.request = response.data.request
      this.hideSubmitDeliveryDistributionModal();
      //this.getAllDistributionList();
      //goToCreateTransactionFromRemittance();
      this.goToSetTransaction(response.data.remittance);
    },
    onDeliveredDistributionFail(err){
      console.log(err)
      var MESSAGE_SAVE_FAILE = 'خطا: ' + err.message;
      this.deliveryToast.text(MESSAGE_SAVE_FAILE).goAway(700);
    },
    goToSetTransaction(remittance) {
      this.$router.push({path: '/transaction/createFromRemittance/'+remittance._id.toString()});
    },
    filterRequestList(remittanceList, filter){
      if(
        !filter.status &&
        !filter.searchKeyword
      ){
        return this.remittanceList;
      }
      var result = remittanceList
        .filter(function(remittance){
          if(
            filter.status
          ){
            if(remittance.status == filter.status){
              return remittance;
            }
          }else{
            return remittance;
          }
        })
        .filter(function(remittance){
          if(
            filter.searchKeyword
          ){
            if(
                (
                  remittance.receiver.user &&
                  remittance.receiver.user.title &&
                  remittance.receiver.user.title.includes(filter.searchKeyword)
                ) ||
              remittance.intermediateCompany.name.includes(filter.searchKeyword) ||
              remittance._id.includes(filter.searchKeyword)
            ){
              return remittance;
            }
          }else{
            return remittance;
          }
        })
        ;
      console.log('new result is');
      console.log(result.length);
      return result;
    },

    backToList() {
      this.$router.push({path: '/dashboard'})
    },

    getAllDistributionList(fromDateTime, toDateTime) {
      this.isLoading = true;
      console.log('here at just new');
      if(this.isJustNew){
        this.getAllNewDistributionList();
      }else{
        RemittanceService
        .getAll_distributionCompany_byDateTimeRange(this.token, fromDateTime, toDateTime)
        .then(this.onGetAllDistributionListSuccess)
        .catch(this.onGetAllDistributionListFail);
      }

    },
    onGetAllDistributionListSuccess(response){
      this.remittanceList = response.data.remittanceList
      this.visibleRemittanceList = this.filterRequestList(this.remittanceList, this.filterObject);
      this.isLoading = false;
    },
    onGetAllDistributionListFail(err){
      console.log(err)
      this.isLoading = false;
    },
    toggleJustNew(){
      console.log(this.isJustNew);
      if(this.isJustNew){
        this.getAllNewDistributionList();
      }else{
        this.getAllDistributionList();
      }
    },
    getAllNewDistributionList(){
      this.isLoading = true;
      RemittanceService
      .getAll_distributionCompany_status(this.token, 'new')
      .then(this.onGetAllDistributionListSuccess)
      .catch(this.onGetAllDistributionListFail);
    },
    getAllNewDistributionListSuccess(response){
      this.remittanceList = response.data.remittanceList
      this.visibleRemittanceList = this.filterRequestList(this.remittanceList, this.filterObject);
      this.isLoading = false;
    },
    getAllNewDistributionListFail(err){
      console.log(err)
      this.isLoading = false;
    },
  },
  created() {
    this.token = localStorage.token;
    if(!this.token){
      this.$router.push({path: '/login'});
    }
 }
};
