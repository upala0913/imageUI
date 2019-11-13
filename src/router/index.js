import Vue from 'vue'
import Router from 'vue-router'
import Core from '@/pages/core.vue'
import ImageManage from '@/pages/imageManage.vue'
import Personal from '@/pages/personal.vue'

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
            path: '/imageManage',
            name: 'imageManage',
            component: ImageManage
        },
        {
            path: '/personal',
            name: 'personal',
            component: Personal
        }
    ]
})
