// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import qs from 'qs'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)

Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true
})
Vue.prototype.$qs = qs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
