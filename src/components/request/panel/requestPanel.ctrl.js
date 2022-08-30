import RequestRestResource from '@/util/http/request.srv';
// import SocketRestResource from '@/util/http/socket.srv';

const RequestService = new RequestRestResource();
// const SocketService = new SocketRestResource();


import RequestFilter from '@/components/request/filter/requestFilter.vue'
import SetWageModal from '@/components/wage/setModal/setWageModal.vue'
import RequestList from '@/components/request/list/requestList.vue'
import ConfirmRejectRequestModal from '@/components/request/confirmRejectModal/confirmRejectRequestModal.vue'
import LoadingList from '@/components/share/loading/list/loadingList.vue'
import DateSelectorInput from '@/components/share/input/dateSelectore/dateSelectorInput.vue';

export default {
  name: 'RequestPanel',
  components: {
    SetWageModal,
    RequestList,
    ConfirmRejectRequestModal,
    RequestFilter,
    LoadingList,
    DateSelectorInput
  },
  title: 'XCHNG | قائمة الطلبات',
  data() {
    return {
      websocketConnection: null,
      requestList: [],
      visibleRequestList: [],
      selectedSetWageRequest: undefined,
      selectedRejectWageRequest: undefined,
      token: undefined,
      showSetRequestWageModal:false,
      showRejectRequestModal:false,
      isLoading:false,
      filterObject:{
        status : undefined,
        searchKeyword : undefined,
        fromDateTime: undefined,
        toDateTime: undefined,
      }
    }
  },
  // sockets:{
  //   connect(){
  //     console.log('Socket Connected');
  //     SocketService.register(this.token,this.$socket);
  //   }
  // },
  methods: {
    backToList() {
      this.$router.push({path: '/company'})
    },
    setDateTime(fromDateTime, toDateTime){
      this.filterObject.fromDateTime = fromDateTime;
      this.filterObject.toDateTime = toDateTime;
      this.getAllRequest(fromDateTime, toDateTime);
    },
    filteChanged(status, searchKeyword){
      this.filterObject.status = status;
      this.filterObject.searchKeyword = searchKeyword;
      this.visibleRequestList = this.filterRequestList(this.requestList, this.filterObject);
    },
    showSetWageModal(request) {
      this.selectedSetWageRequest = request;
      this.showSetRequestWageModal = true;
    },

    hideSetWageModal(forceRefresh) {
      if(forceRefresh){
        this.getAllRequest();
      }
      this.selectedSetWageRequest = undefined,
      this.showSetRequestWageModal = false;
    },

    showRejectRequestConfrimModal(request) {

      this.selectedRejectWageRequest = request;
      this.showRejectRequestModal = true;
    },

    hideRejectRequestConfirmModal() {
      this.selectedRejectWageRequest = undefined;
      this.showRejectRequestModal = false;
    },

    rejectRequest(request) {
      RequestService
      .reject(this.token, request._id)
      .then(this.onRejectRequestSuccess)
      .catch(this.onRejectRequestFail)
    },
    onRejectRequestSuccess(response){
      console.log(response.data.request);
      //this.request = response.data.request
      this.hideRejectRequestConfirmModal();
      this.getAllRequest(  this.filterObject.fromDateTime, this.filterObject.toDateTime);
    },
    onRejectRequestFail(err){
        alert(err.response.data.message);
    },
    filterRequestList(requestList, filter){
      if(
        !filter.status &&
        !filter.searchKeyword
      ){
        return this.requestList;
      }
      var result = requestList
        .filter(function(request){
          if(
            filter.status
          ){
            if(request.status == filter.status){
              return request;
            }
          }else{
            return request;
          }
        })
        .filter(function(request){
          console.log(request);
          if(
            filter.searchKeyword
          ){
            if(
              request.receiverTitle.includes(filter.searchKeyword) ||
              request.intermediateCompany.name.includes(filter.searchKeyword) ||
              request._id.includes(filter.searchKeyword)
            ){
              return request;
            }
          }else{
            return request;
          }
        })
        ;
      console.log('new result is');
      console.log(result.length);
      return result;
    },
    getAllRequest(fromDateTime, toDateTime) {
      this.isLoading = true;
      RequestService
      .getAllByDateTimeRange(this.token, fromDateTime, toDateTime)
      .then(this.onGetAllRequestSuccess)
      .catch(this.onGetAllRequestFail)
    },

    onGetAllRequestSuccess(response){
      this.requestList = response.data.requestList
      this.visibleRequestList = this.filterRequestList(this.requestList, this.filterObject);
      this.isLoading = false;
    },

    onGetAllRequestFail(err){
      alert(err.response.data.message);
      this.isLoading = false;
    }
  },
  created() {
    this.token = localStorage.token;
    console.log('RequestPanel')

  }
}
