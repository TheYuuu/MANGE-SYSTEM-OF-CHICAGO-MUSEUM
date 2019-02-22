import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/welcome'
    },
    {
      path:'/welcome',
      component: resolve => require(['../components/Pages/welcome'], resolve)
    },
    {
      path:'/ObjectCategory',
      component: resolve => require(['../components/Pages/ObjectCategory'], resolve)
    },
    {
      path:'/StoryLine',
      component: resolve => require(['../components/Pages/StoryLine'], resolve)
    },
    {
      path:'/ThemeColor',
      component: resolve => require(['../components/Pages/ThemeColor'], resolve)
    }
  ]
})