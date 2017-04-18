import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MuseUI from 'muse-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'muse-ui/dist/muse-ui.css'
import store from './store/store'
import axios from './http'

// 将axios 挂载到prototype上，在组件中可以直接使用this.axios访问!!重要！！
Vue.prototype.axios = axios 
Vue.use(MuseUI)
Vue.use(VueAwesomeSwiper)

new Vue({
  el: '#app',
  axios,
  router,
  store,
  render: h => h(App)
})
