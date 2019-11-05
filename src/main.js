// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 设置基础路径
axios.defaults.baseURL = "http://127.0.0.1:8090";

import axios from "axios";

Vue.config.productionTip = false;
Vue.use(Element);
Vue.prototype.$axios = axios;

new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
