import UserInput from '@/components/user/input/userInput.vue';
import UserSearchBox from '@/components/user/searchBox/userSearchBox.vue';
import UserLabel from '@/components/user/label/userLabel.vue'

export default {
  name: 'UserPanel',
  components: {
    UserInput,
    UserSearchBox,
    UserLabel
  },
  props: {
    positionTitle : String ,
    token : String,
    onUserSelected: { type: Function }
  },
  methods:{
    goToSearchUser(){
      this.isNewUser = false;
      this.userPosition = { title: '' };
      if(this.onUserSelected){
        this.onUserSelected(undefined);
      }
    },
    addAsNewUser() {
      if(this.onUserSelected){
        this.onUserSelected(this.userPosition);
      }
      this.isNewUser = true;
    },
    userTitleChanged(userTitle){
      this.userPosition.title = userTitle;
    },
    userSelected(userPosition){
      this.userPosition = userPosition;
      if(this.onUserSelected){
        this.onUserSelected(this.userPosition);
      }
    }
  },
  data() {
    return {
      isNewUser: false,
      userPosition: {
        title:''
      },
    }
  },
}
