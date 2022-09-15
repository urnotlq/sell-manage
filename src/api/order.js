/* 订单接口模块 */
import request from '@/utils/request.js';


// 获取订单列表（带查询）
export const getOrderListReq = (params) => {
    return request({
        url: '/order/list',
        method: 'get',
        params,
    })
}

// 获取订单详情
export const getOrderDetailReq = (params) => {
    return request({
        url: '/order/detail',
        method: 'get',
        params,
    })
}

// 首页统计报表
export const getTotalDataReq = () => {
    return request({
        url: '/order/totaldata',
        method: 'get'
    })
}

// 订单统计报表
export const getOrderTotalReq = (params) => {
    return request({
        url: '/order/ordertotal',
        method: 'get',
        params
    })
}