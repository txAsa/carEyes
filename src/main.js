// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/icon/iconfont.css'
import Vue from 'vue'
import App from './App'
import router from './router'


import store from './store'

// 引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})


