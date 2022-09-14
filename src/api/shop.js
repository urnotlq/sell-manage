/* 店铺接口模块 */
import request from '@/utils/request';

// 获取店铺详情
export const getShopInfoReq = () => {
    return request({
        url: '/shop/info',
        method: 'get',
    })
}

// 店铺内容修改
export const editShopReq = (data) => {
    return request({
        url: '/shop/edit',
        method: 'post',
        data,
    })
}