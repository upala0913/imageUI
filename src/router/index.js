import Vue from 'vue';
import Router from 'vue-router';
import Core from '../pages/core.vue';
import ImageManage from '../pages/imageManage.vue';
import Personal from '../pages/personal.vue';
import imageInfo from '../pages/image/imageInfo.vue';
import imageUpload from "../pages/image/imageUpload";
import imageDiscern from "../pages/image/imageDiscern";
import imageBase64 from "../pages/image/imageBase64";

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
            component: ImageManage,
            redirect: "imageInfo",
            children: [
                {
                    path: '/imageInfo',
                    name: 'imageInfo',
                    component: imageInfo
                },
                {
                    path: '/imageUpload',
                    name: 'imageUpload',
                    component: imageUpload
                },
                {
                    path: '/imageDiscern',
                    name: 'imageDiscern',
                    component: imageDiscern
                },
                {
                    path: '/imageBase64',
                    name: 'imageBase64',
                    component: imageBase64
                }
            ]
        },
        {
            path: '/personal',
            name: 'personal',
            component: Personal
        }
    ]
})
