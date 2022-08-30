import Vue from 'vue'
import App from './App.vue'
import Toasted from 'vue-toasted';
import router from './router'
import './assets/css/style.css';
import titleMixin from './mixins/titleMixin'

// import VueSocketIOExt from 'vue-socket.io-extended';
// import { io } from 'socket.io-client';

// const socket = io('https://api_panel.xchng.space/');
// Vue.use(VueSocketIOExt, socket);


Vue.config.productionTip = false
Vue.use(Toasted)
Vue.mixin(titleMixin)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
