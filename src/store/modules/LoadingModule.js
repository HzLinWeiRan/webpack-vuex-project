import * as constants from '../constants'

export default {
    state: {
        isLoading: false
    },
    mutations: {
        [constants['LOAD_ACTION']](state,{isLoading}){
            state.isLoading = isLoading;
        }
    }
}