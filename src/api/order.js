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