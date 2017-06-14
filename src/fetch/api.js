import axios from 'axios'

const instance = axios.create({
    baseURL: '/api/',
    timeout: 10000
})

instance.interceptors.response.use((res) => {
    console.log(res);
    if(!res) {
        return Promise.reject(res);
    }
    return res;
},(error) => {
    return Promise.reject(error);
})

export function fetch(params) {
    return new Promise((reslove, reject) => {
        instance(params).then(res => {
            reslove(res);
        }).catch(error => {
            reject(error);
        })
    })
}

export default {
    getUser(params) {
        return fetch({
            method: 'get',
            url: `/users`,
            params: params
        });
    }
}
