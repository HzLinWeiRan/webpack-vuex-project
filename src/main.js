// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store'
import VueI18n from 'vue-i18n'
import { LoadingPlugin, AlertPlugin, LocalePlugin} from 'vux'
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(LocalePlugin)
//import Hello from './components/Hello'
Vue.use(VueI18n)
Vue.use(VueRouter)

const routes = require('./routes')

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

var messages = {
  "zh-CN": require('./i18n/zh-CN.js'),
  "en": require('./i18n/en.js')
} 

localStorage.locale || (localStorage.locale = Vue.locale.get());

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: localStorage.locale, // set locale
  fallbackLocale: "zh-CN",
  messages // set locale messages
})


  //i18n,
/* eslint-disable no-new */
new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')


router.beforeEach(function (to, from, next) {
  
  if (to.path != "/" && !sessionStorage.userName) {
    router.push("/");
    return;
  } else {
    store.commit('LOAD_ACTION', { isLoading: true })
    next();
  }

})

router.afterEach(function (to) {
  var params = {};

  if (to.path == "/") {
    params.title = "homepage";
    params.isHomePage = true;
  } else {
    params.title = to.path.split('/')[1];
    params.isHomePage = false;
  }
  store.commit('UPDATE_TITLE', params)
  store.commit('LOAD_ACTION', { isLoading: false })
})
