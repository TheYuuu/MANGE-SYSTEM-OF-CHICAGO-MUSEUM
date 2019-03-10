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
    Oridata: {},
    Storydata: {}
  },
  getters: {
    getOridata (state) {
      return state.Oridata
    },
    getStorydata (state) {
      return state.Storydata
    }
  },
  mutations: {
    getOridataMutation (state, aim) {
      state.Oridata = aim
    },
    getStorydataMutation (state, aim) {
      state.Storydata = aim
    }
  },
  actions: {
    getOridataAction (context, aim) {
      context.commit('getOridataMutation', aim)
    },
    getStorydataAction (context, aim) {
      context.commit('getStorydataMutation', aim)
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
