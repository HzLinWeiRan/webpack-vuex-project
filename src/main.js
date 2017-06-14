// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store'
import { LoadingPlugin, AlertPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
//import Hello from './components/Hello'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: function (resolve) {
    require(['./pages/homepage'], resolve);
  }
},
{
  path: '/page1',
  component: function (resolve) {
    require(['./pages/page1'], resolve);
  }
},
{
  path: '/page2/:test',
  name: "user",
  component: function (resolve) {
    require(['./pages/page2'], resolve);
  }
}
]

const router = new VueRouter({
  routes
})


FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')


router.beforeEach(function (to, from, next) {
  store.commit('LOAD_ACTION', { isLoading: true })
  next();
})

router.afterEach(function (to) {
  var params = {};
  if (to.path == "/") {
    params.title = "首页";
    params.isHomePage = true;
  } else {
    params.title = "子页面";
    params.isHomePage = false;
  }
  store.commit('UPDATE_TITLE', params)
  store.commit('LOAD_ACTION', { isLoading: false })
})
