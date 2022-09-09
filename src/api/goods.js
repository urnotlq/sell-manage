/* 商品接口模块 */
import request from '@/utils/request';

// 获取分类接口
export const getCateListReq = (params) => {
    return request({
        url: '/goods/catelist',
        method: 'get',
        params
    })
}

// 修改分类接口
export const editCateReq = (data) => {
    return request({
        url: '/goods/editcate',
        method: 'post',
        data
    })
}

// 获取分类接口
export const delCateReq = (params) => {
    return request({
        url: '/goods/delcate',
        method: 'get',
        params
    })
}