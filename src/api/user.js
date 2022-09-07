/* 用户接口模块 */
// 引入工具函数
import request from '@/utils/request.js'


// 登录接口
export const checkLoginReq = (data) => {
    return request({
        url: '/users/checkLogin',
        method: 'post',
        data: data
    })
}

// 添加账号接口
export const addUserReq = (data) => {
    return request({
        url: '/users/add',
        method: 'post',
        data
    })
}

// 获取账号列表接口
export const getUserListReq = (params) => {
    return request({
        url: '/users/list',
        method: 'get',
        params: params
    })
}

// 删除账号接口
export const delUserReq = (params) => {
    return request({
        url: '/users/del',
        method: 'get',
        params
    })
}

// 添加账号接口 
export const editUserReq = (data) => {
    return request({
        url: '/users/edit',
        method: 'post',
        data
    })
}

// 删除账号接口
export const batchDelUserReq = (params) => {
    return request({
        url: '/users/batchdel',
        method: 'get',
        params
    })
}

// 获取账号（个人中心）信息
export const getUserInfoReq = () => {
    return request({
        url: '/users/info',
        method: 'get'
    })
}

// 修改用户头像
export const editAvatarReq = (params) => {
    return request({
        url: '/users/avataredit',
        method: 'get',
        params
    })
}