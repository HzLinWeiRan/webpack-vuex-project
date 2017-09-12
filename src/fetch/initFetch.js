import axios from 'axios'
const CancelToken = axios.CancelToken
// 给ajax添加中止入口
function addCancel(config, cancel) {
    if (cancel) {
        config.cancelToken = new CancelToken(function executor(c) {
            cancel = c
        })
    }
}

// 公共配置
const init = (baseURL, router) => {
    const instance = axios.create({
        // 设置超时时间
        timeout: 30000,
        // 请求的baseUrl
        baseURL: baseURL,
        // 请求头部信息
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // 请求参数转换
        transformRequest: [function (data, headers) {
            let ret = ''
            for (let it in data) {
                if (ret !== '') ret += '&'
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
            }
            return ret
        }]
    })

    instance.interceptors.response.use((res) => {
        if (res.data.code === '201') {
            sessionStorage.clear()
            router.replace('/login')
            return Promise.reject(res.data)
        }
        if (!res) {
            return Promise.reject(res)
        }
        return res.data
    }, (error) => {
        return Promise.reject(error)
    })

    const apis = {}

    // 发送登录验证码
    apis.getVcode = (data, cancel) => {
        let config = {
            method: 'post',
            url: `/web/session/getVcode${window.suffix}`,
            data
        }
        addCancel(config, cancel)
        return instance(config)
    }

    return apis
}
export default init