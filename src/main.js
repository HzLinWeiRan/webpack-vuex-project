// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import 'element-ui/lib/theme-default/index.css'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store'
import initFetch from '@/fetch/initFetch'

const routes = require('./routes.js')

const router = new VueRouter({ routes })
Vue.prototype.$webApis = initFetch(window.baseUrl, router)

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app-box')

// 页面跳转前
router.beforeEach(function (to, from, next) {
})

// 页面跳转后
router.afterEach(function (to) {
})
