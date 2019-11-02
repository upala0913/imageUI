// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入axios
var axios = require('axios')
// 设置基本的路径
axios.default.baseURL = 'http://106.13.33.67:8090/image'
//将api绑定到全局
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
