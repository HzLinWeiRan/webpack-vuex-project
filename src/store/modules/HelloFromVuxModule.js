import * as constants from '../constants'
import api from '../../fetch/api'

const actions =  {
     async [constants['DO_ACTION2']]({dispatch}){
        return await dispatch('test2');
        //console.log(await dispatch('test'));
        // await api.getUser({
        //     '_limit': 4,
        //     '_page': 2
        // }).then((res) => {
        //     commit(constants['DO_SET2'], res)
            
        // });
    },
    
    async 'test2'({commit,dispatch}){
        const res = await api.getUser({
            '_limit': 4,
            '_page': 2
        })
        return res
    }
}

const state = {
    msg: 'hello'
}

const mutations = {
    [constants['DO_SET2']](state,data){
        console.log(data);
        state.msg += 1;
    }
}


export default {
    state,
    mutations,
    actions
}