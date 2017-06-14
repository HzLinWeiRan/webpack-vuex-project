import Vue from 'vue'
import Vuex from 'vuex'
import module from './modules/HelloFromVuxModule'
import loadModule from './modules/LoadingModule'
import userModule from './modules/userModule'
import * as constants from './constants'
import api from '@/fetch/api'


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        msg:'',
        arr: []
    },
    getters: {
        getLength: function(state, getters){
            return  state.arr.length
        }
    },
    mutations: {
        [constants['DO_SET']]: function(state){
            console.log(arguments);
            state.msg += 1
            sessionStorage.setItem('msg',state.msg)
            state.arr.push(new Date().getTime());
        },
        'SET_MSG'(state,msg){
            sessionStorage.setItem('msg',msg)
            state.msg = msg
        }
    },
    actions: {
        async 'INIT_MSG'({commit,state}){
            if(state.msg){
                return;
            }
            let msg = sessionStorage.getItem('msg')
            if(msg){
                commit('SET_MSG', msg);
            } else {
                let data = await api.getUser({
                    '_limit': 1,
                    '_page': 2
                });
                console.log(data.data[0].name);
                commit('SET_MSG', data.data[0].name);
            }
        },
        [constants['DO_ACTION']]({commit} ){
            setTimeout(function(){
                commit(constants['DO_SET'])
            },1000);
        }
    },
    modules: {
        a: module,
        loadModule: loadModule,
        user: userModule,
    }
});  