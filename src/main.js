// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

import './assets/animate.css'

Vue.use(Vuex)

Vue.config.productionTip = false

let store = new Vuex.Store({
  state: {
    Oridata: {}
  },
  getters: {
    getOridata (state) {
      return state.Oridata
    }
  },
  mutations: {
    getOridataMutation (state, aim) {
      state.Oridata = aim
    }
  },
  actions: {
    getOridataAction (context, aim) {
      context.commit('getOridataMutation', aim)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
