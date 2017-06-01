// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store'
import * as contants from './store/constants'
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin);
//import Hello from './components/Hello'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: function(resolve){
        require(['./pages/HelloFromVux/'], resolve);
    }
  },
  {
    path: '/hello',
    component: function(resolve){
      require(['./pages/Hello/'], resolve);
    }
  },
  {
    path: '/user/:test',
    name:"user",
    component: function(resolve){
      require(['./pages/User/'], resolve);
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


router.beforeEach(function(to, from, next){
  store.commit(contants['LOAD_ACTION'], {isLoading: true})
  next();
})

router.afterEach(function (to) {
  store.commit(contants['LOAD_ACTION'], {isLoading: false})
})
