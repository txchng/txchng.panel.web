import TrackingCodeSearchBox from '@/components/trackingCode/seachBox/trackingCodeSeachBox.vue'
export default {
  name: 'NavigationPanel',
  components:{TrackingCodeSearchBox},
  props:[],
  methods:{
    logout(){
      localStorage.clear();
      this.navigateToLogin();
    },
    navigateToLogin(){
      this.$router.push({path: '/'});
    },
  }
};
