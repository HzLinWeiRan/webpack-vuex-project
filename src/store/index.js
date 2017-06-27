import Vue from 'vue'
import Vuex from 'vuex'
import homepageModule from './modules/homepageModule'
import appModule from './modules/appModule'
import userModule from './modules/userModule'
import api from '@/fetch/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        msg: 'test',
        userName: undefined
    },
    getters: {
    },
    mutations: {
        'INIT_STATUS'(state) {
            state.userName = sessionStorage.userName;
        },
        'LOGIN_ACTION'(state){
            sessionStorage.userName = "admin";
            state.userName = sessionStorage.userName;
        },
        
        'LOGIN_OUT_ACTION'(state){
            delete sessionStorage.userName;
            state.userName = undefined;
        }
    },
    actions: {
    },
    modules: {
        homepage: homepageModule,
        appModule: appModule,
        user: userModule
    }
});  