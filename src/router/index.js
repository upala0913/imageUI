import Vue from 'vue'
import Router from 'vue-router'
import Core from '@/pages/core.vue'
import Image from '@/pages/image.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'core',
      component: Core
    },
    {
      path: '/image',
      name: 'image',
      component: Image
    }
  ]
})
