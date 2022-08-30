
import AddWageModal from '@/components/wage/addModal/addWageModal.vue'
import WageRestResource from '@/util/http/wage.srv';
const WageService = new WageRestResource();

export default {
  name: 'WagePanel',
  components:{AddWageModal},
  data() {
    return {
      wageList: [],
      token:'fakeToken',
      isLoading: false,
    }
  },
  methods :{
    getAll() {
      this.isLoading = true;
      WageService
        .getAll(this.token)
        .then(this.onGetAllSuccess)
        .catch(this.onGetAllFailed)
    },
    onGetAllSuccess(response){
      this.isLoading = false;
      this.wageList = response.data.wageList;
    },
    onGetAllFailed(err){
      this.isLoading = false;
      console.log(err)
      var MESSAGE_SAVE_FAILE = 'خطا: ' + err.message;
      this.saveToast.text(MESSAGE_SAVE_FAILE).goAway(700);
    }
  },
  created() {
    this.token = localStorage.token;
    if (!this.token) {
        this.$router.push({path: '/login'})
    }
    this.getAll()
  }
}
