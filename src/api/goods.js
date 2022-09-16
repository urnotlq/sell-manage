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

// 查询所有商品分类接口
export const selectAllCategoriesReq = () => {
    return request({
        url: '/goods/categories',
        method: 'get',
    })
}

// 添加商品接口
export const addGoodsReq = (data) => {
    return request({
        url: '/goods/add',
        method: 'post',
        data
    })
}

// 获取商品列表接口
export const getGoodsListReq = (params) => {
    return request({
        url: '/goods/list',
        method: 'get',
        params
    })
}

// 删除商品接口
export const delGoodsReq = (params) => {
    return request({
        url: '/goods/del',
        method: 'get',
        params
    })
}

// 修改商品接口
export const editGoodsReq = (data) => {
    return request({
        url: '/goods/edit',
        method: 'post',
        data
    })
}