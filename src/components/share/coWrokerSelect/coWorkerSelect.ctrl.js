import CompanyRestResource from '@/util/http/company.srv';

const CompanyService = new CompanyRestResource();

export default {
  name: 'CoWorkerSelect',
  props: {
    token: String,
    onCoWorkerSelectedMethod: { type: Function }
  },
  data() {
    return {
      selectedCompany: {},
      companyList: [],
    }
  },
  methods:{
    onCoWorkerSelected(event) {
      this.onCoWorkerSelectedMethod(event.target.value);
    },
    getCompanyCoWorkerList() {
      CompanyService
        .getCoWorkerCompanyList(this.token)
        .then(this.onGetCompanyCoworkerListSuccess)
        .catch(this.onGetCompanyCoworkerListFail);
    },
    onGetCompanyCoworkerListSuccess(response){
      this.companyList = response.data.companyList
    },
    onGetCompanyCoworkerListFail(err){
      console.log(err)
    }
  },
  created() {
    this.getCompanyCoWorkerList();
 }
}
