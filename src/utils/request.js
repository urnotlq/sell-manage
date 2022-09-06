/* axios工具函数层 */

import axios from 'axios';

// 默认请求地址
axios.defaults.baseURL = 'http://localhost:5000'

// 默认超时时间
axios.defaults.timeout = 10000

// 请求拦截器 携带统一参数
axios.interceptors.request.use(config => {
    // 通过config.headers 里配置一个同后端商量好的字段并携带从后台取出的token 发送请求
    config.headers.authorization = localStorage.getItem('t_k')

    // config 请求信息对象
    return config
}, err => {
    // 异步抛出错误信息
    return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(response => {
    // response 响应信息对象
    return response
}, err => {
    return Promise.reject(err)
})


//导出配置好的axios
export default axios