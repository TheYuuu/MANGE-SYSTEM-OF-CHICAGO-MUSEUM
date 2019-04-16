// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

import './assets/animate.css'

// eslint-disable-next-line import/no-duplicates
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// eslint-disable-next-line import/no-duplicates
import { Slider, Button, Carousel, Loading  } from 'element-ui'
Vue.use(ElementUI)
Vue.use(Button)
Vue.use(Slider)
Vue.use(Carousel)
Vue.use(Loading)
Vue.use(Vuex)

Vue.config.productionTip = false

let store = new Vuex.Store({
  state: {
    Oridata: {},
    Storydata: {},
    Tagdata: {}
  },
  getters: {
    getOridata (state) {
      return state.Oridata
    },
    getStorydata (state) {
      return state.Storydata
    },
    getTagdata (state) {
      return state.Tagdata
    }
  },
  mutations: {
    getOridataMutation (state, aim) {
      state.Oridata = aim
    },
    getStorydataMutation (state, aim) {
      state.Storydata = aim
    },
    getTagdataMutation (state, aim) {
      state.Tagdata = aim
    }
  },
  actions: {
    getOridataAction (context, aim) {
      context.commit('getOridataMutation', aim)
    },
    getStorydataAction (context, aim) {
      context.commit('getStorydataMutation', aim)
    },
    getTagdataAction (context, aim) {
      context.commit('getTagdataMutation', aim)
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
