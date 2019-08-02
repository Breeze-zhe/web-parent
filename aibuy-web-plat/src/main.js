import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'

import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'

//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'

/*import Mock from './mock'
Mock.bootstrap();*/

import 'font-awesome/css/font-awesome.min.css'


// 引用axios，并设置基础URL为后端服务api地址
//import axios from 'axios'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:1269/services' //对应后端网关统一地址
// 将API方法绑定到全局  /plat/login
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})
//路由之前的操作
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    //如果跳转到登录界面，从前端session中删除存储的用户信息
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
    //如果session中没有user并且跳转的路径非登录路径
    if (!user && to.path != '/login') {
        //跳转到登录页面
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

