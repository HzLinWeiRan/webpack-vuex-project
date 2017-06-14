import Vue from 'vue'
import Vuex from 'vuex'
import homepageModule from './modules/homepageModule'
import appModule from './modules/appModule'
import userModule from './modules/userModule'
import api from '@/fetch/api'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        msg: 'test'
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        homepage: homepageModule,
        appModule: appModule,
        user: userModule,
    }
});  