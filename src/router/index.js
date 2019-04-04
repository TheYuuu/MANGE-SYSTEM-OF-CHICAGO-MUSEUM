import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/'
      // redirect: '/welcome'
    },
    // {
    //   path: '/welcome',
    //   component: resolve => require(['../components/Pages/welcome'], resolve)
    // },
    {
      path: '/TagsView',
      component: resolve => require(['../components/Pages/TagsView/TagsView3'], resolve)
    },
    {
      path: '/ArtistView',
      component: resolve => require(['../components/Pages/ArtistView/ArtistView'], resolve)
    },
    {
      path: '/PreView',
      component: resolve => require(['../components/Pages/PreView/PreView'], resolve)
    }
  ]
})
