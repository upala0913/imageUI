import Vue from 'vue'
import Router from 'vue-router'
import blogIndex from '@/components/BlogIndex.vue'
import blogLogin from '@/components/common/BlogLogin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'blogIndex',
      component: blogIndex
    },
    {
      path: '/manage',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'blogLogin',
      component: blogLogin
    }
  ]
})
