import CompanyRestResource from '@/util/http/company.srv';
const CompanyService = new CompanyRestResource();

export default {
  name: 'AddCoWorkerCompany',
  data() {
    return {
      coWorkercompany: { name: '', email: '' },
      owner:{ firstname: '', lastname: '', cellNumber: '', email: '' },
    }
  },
  props:{
    onCloseMethod: { type: Function },
  },
  methods:{
    addCoWorkerCompany() {
      CompanyService.addCoWorkerCompany('fackedAuthToken', this.coWorkercompany,this.owner)
      .then(this.onAddCoWorkerCompanySuccess)
      .catch(this.onAddCoWorkerCompanyFail)
    },
    onAddCoWorkerCompanySuccess(response){
      this.company = response.data.company
    },
    onAddCoWorkerCompanyFail(err){
      console.log(err)
    },
    close(){
      if(this.onCloseMethod){
        this.onCloseMethod();
      }
    },
  },

}
