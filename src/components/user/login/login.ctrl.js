import UserRestResource from '@/util/http/user.srv';
const UserService = new UserRestResource();

export default {
  name: 'Login',

  props: {},
  data() {
    return {
      email: undefined,
      password: undefined,
    }
  },
  methods :{
    login() {
      UserService
      .checkCredentials(this.email, this.password)
      .then(this.onLoginSuccess)
      .catch(this.onLoginFail)
    },
    navigateToDashboard(){
      this.$router.push({path: '/request/list'})
    },
    onLoginSuccess(response){
      this.auth = response.data.auth;
      localStorage.token = this.auth.auth._id;
      localStorage.companyName = this.auth.company.name;
      localStorage.companyId = this.auth.company._id;
      this.navigateToDashboard()
    },
    onLoginFail(err){
      console.log(err.response.data.message);
      this.$toasted.show("Invalid Email or Password", {
        type: 'info',
        duration: 1700
      });
    }
  },
  created() {}
}
