import CompanyRestResource from '@/util/http/company.srv';
import RequestRestResource from '@/util/http/request.srv';

const CompanyService = new CompanyRestResource();
const RequestService = new RequestRestResource();


export default {
  name: 'SendDistributionRequestModal',
  props:["remittanceId","token"],
  data() {
    return {
      selectedDistributorCompany: {},
      companyList: []
    }
  },
  methods: {
    backToList() {
      this.$router.push({path: '/company'})
    },
    sendDisterbutionRequest() {
      RequestService
        .createForRemittance(this.token, this.remittanceId, this.selectedDistributorCompany)
        .then(this.onSendDisterbutionRequestSuccess)
        .catch(this.onSendDisterbutionRequestFail);
    },
    onSendDisterbutionRequestSuccess(response){
      alert('saved!')
      this.remittance = response.data.remittance
    },
    onSendDisterbutionRequestFail(err){
      console.log(err)
    },
    getCoworkerList(){
      CompanyService
        .getCoWorkerCompanyList(this.token)
        .then(this.onGetCoworkerListSuccess)
        .catch(this.onGetCoworkerListFail);
    },
    onGetCoworkerListSuccess(response){
      this.companyList = response.data.companyList
    },
    onGetCoworkerListFail(err){
      console.log(err)
    }
  },
  created() {
    this.getCoworkerList();
  },
}
