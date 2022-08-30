export default {
  name: "Splash",
  created(){
    this.token = localStorage.token;
    if(this.token){
      this.$router.push({path: '/request/list'})
    }else{
      this.$router.push({path: '/login'})
    }
  }
};
