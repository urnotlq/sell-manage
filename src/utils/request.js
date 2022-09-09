/* axios工具函数层 */

import axios from 'axios';
import { Message } from 'element-ui';
import local from '@/utils/local.js';
import router from '@/router';

// 默认请求地址
axios.defaults.baseURL = 'http://localhost:5000'

// 默认超时时间
axios.defaults.timeout = 10000

// 请求拦截器 携带统一参数
axios.interceptors.request.use(config => {
    // 通过config.headers 里配置一个同后端商量好的字段并携带从后台取出的token 发送请求
    config.headers.authorization = local.get('t_k')

    // config 请求信息对象
    return config
}, err => {
    // 异步抛出错误信息
    return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(response => {
    // response 响应信息对象
    // 解构响应状态码和提示信息 统一处理状态码
    let { code, msg } = response.data;
    switch (code) {
        case 0:
            Message.success(msg);
            break;
        case 1:
            Message.error(msg);
            break;
        case 5001:
            Message.error(msg);
            break;
        default:
            break;
    }
    return response
}, err => {
    console.log('err :>> ', err);
    // 解构错误状态码
    let code = err.response.data.code ? err.response.data.code : err.code;
    let msg = err.response.data.msg ? err.response.data.msg : err.message;
    // 显示错误提示信息
    Message.error(msg);

    // 无效token处理  跳转登录 清空token 登录后重新跳转至该页面
    if (code === 401) {
        // 获取当前路由信息
        let path = router.currentRoute.path;
        // 清空token
        local.clear();
        // 路由传参
        router.push({ path: '/login', query: { redirect: path } });
    }

    return Promise.reject(err);
})


//导出配置好的axios
export default axios