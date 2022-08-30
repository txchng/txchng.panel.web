export default {
  name: 'UserInput',
  props: {
    userTitle : String,
    onDataChanged: { type: Function }
  },
  methods:{
    userDataChanged(){
      if(this.onDataChanged){
        console.log('asdfasd');
        this.onDataChanged(this.user);
      }
    }
  },
  data() {
    return {
      user: {
        title: '',
        firstname: '',
        lastname: '',
        cellNumber:'',
        email: '',
      }
    }
  },
  created(){
    this.user.title = this.userTitle;
  }
}
