import UserPositionRestResource from '@/util/http/userPosition.srv';
const UserPositionService = new UserPositionRestResource();

import LoadingList from '@/components/share/loading/list/loadingList.vue'

export default {
  name: 'UserSearchBox',
  components:{ LoadingList },
  props: {
    token : String,
    positionTitle: String,
    onUserSelectedd: { type: Function },
    onUserTitleChanged : { type: Function },
  },
  methods:{
    selectedUserChange(user) {
      this.selectedUser = user;
      this.userList = [];
      this.userTitle = '';

      if(this.onUserSelectedd){
        this.onUserSelectedd(this.selectedUser);
      }
    },
    userTitleChanged(){

      if(this.userTitle.length >= 2){
        this.getUserPositionListFromServer();
      }else{
        this.userList = [];
      }

      if(this.onUserTitleChanged){
        this.onUserTitleChanged(this.userTitle);
      }
    },

    getUserPositionListFromServer(){
      this.fetchingData = true;
      UserPositionService
      .getAll_positionTitle_keyword(this.token, this.positionTitle, this.userTitle)
      .then(this.onGetUserPositionListFromServerSuccess)
      .catch(this.onGetUserPositionListFromServerFail);
    },

    onGetUserPositionListFromServerSuccess(response){
      console.log(response.data.userPositionList);
      this.userList = response.data.userPositionList
      .filter(function(userPosition){
        if(userPosition.user){
          return userPosition;
        }
      })
      .map(function(userPosition){
        return {
          _id: userPosition._id,
          title: userPosition.user.title,
          firstname: userPosition.user.firstname,
          lastname: userPosition.user.lastname,
          cellNumber: userPosition.user.cellNumber,
          email: userPosition.user.email,
        };
      });
      this.fetchingData = false;

    },

    onGetUserPositionListFromServerFail(err){
      alert(err.response.data.message);
      this.fetchingData = false;
    },
  },
  data() {
    return {
      fetchingData: false,
      userTitle: '',
      selectedUser : undefined,
      userList:[],
    };
  },
};
