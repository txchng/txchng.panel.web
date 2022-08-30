import CompanyRestResource from '@/util/http/company.srv';
const CompanyService = new CompanyRestResource();
import AddCoWorkerCompany from '@/components/company/addCoWorker/addCoWorkerCompany.vue';
import CoWorkerList from '@/components/coWorker/list/coWorkerList.vue';
import LoadingList from '@/components/share/loading/list/loadingList.vue';

export default {
  name: 'CoworkerCompanyPanel',
  components:{
    AddCoWorkerCompany,
    CoWorkerList,
    LoadingList,
  },
  title: 'سامانه تبادل مشتری | لیست همکاران',

  data() {
    return {
      companyList: [],
      token:undefined,
      isAddCoworkerVisibile:false,
      isLoading: false,
    };
  },
  methods:{
    showAddCoWorkerModal(){
      this.isAddCoworkerVisibile = true;
    },
    hideAddCoWorkerModal(forceReload){
      this.isAddCoworkerVisibile = false;
      if(forceReload == true){
        this.getCoWorkerCompanyList();
      }
    },
    getCoWorkerCompanyList(){
      this.isLoading = true;
      CompanyService
      .getCoWorkerCompanyList(this.token)
      .then(this.onGetCoWorkerCompanyListSuccess)
      .catch(this.onGetCoWorkerCompanyListFail)
    },
    onGetCoWorkerCompanyListSuccess(response){
      this.companyList = response.data.companyList;
      this.isLoading = false;
    },
    onGetCoWorkerCompanyListFail(err){
      alert(err.response.data.message);
      this.isLoading = false;
    }

  },
  created() {
    this.token = localStorage.token;
    if (!this.token) {
        this.$router.push({path: '/login'});
    }
    this.getCoWorkerCompanyList();
  },
};
