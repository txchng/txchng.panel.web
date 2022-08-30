import UserPositionRestResource from '@/util/http/userPosition.srv';
const UserPositionService = new UserPositionRestResource();

import LoadingList from '@/components/share/loading/list/loadingList.vue';
import UserPositionList from '@/components/userPosition/list/userPositionList.vue';

export default {
  name: 'UserPositionPanel',
  components: {
    LoadingList,
    UserPositionList
  },
  data(){
      return {
        userPositionList:[],
        isLoading: false,
        visibleUserPositionList: [],
      };
  },
  methods: {
    getUserPositionList(){
      this.isLoading = true;
      UserPositionService
          .getAll(this.token)
          .then(this.onGetUserPositionListSuccess)
          .catch(this.onGetUserPositionListFaile);
    },
    onGetUserPositionListSuccess(response){
      this.userPositionList = response.data.userPositionList;
      this.isLoading = false;
    },
    onGetUserPositionListFaile(err){
      alert(err.response.data.message);
      this.isLoading = false;
    },
  },
  created() {
      this.token = localStorage.token;
      if (!this.token) {
          this.$router.push({path: '/login'});
      }
      this.getUserPositionList();
  }
};
