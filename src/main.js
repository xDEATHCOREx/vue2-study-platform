import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MuseUI from 'muse-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'muse-ui/dist/muse-ui.css'
import store from './store/store'

Vue.use(MuseUI)
Vue.use(VueAwesomeSwiper)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
