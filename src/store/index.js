import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        msg: 'test',
        radio: '2'
    },
    getters,
    mutations,
    actions,
    plugins: [(store) => {
        store.subscribe((mutation, state) => {
            console.log('plugin')
        })
    }]
})
