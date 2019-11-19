import Vue from 'vue'
import Router from 'vue-router'
import Core from '@/pages/core.vue'
import ImageManage from '@/pages/imageManage.vue'
import Personal from '@/pages/personal.vue'

Vue.use(Router);

/**
 * 重写路由的方法
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
};

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
