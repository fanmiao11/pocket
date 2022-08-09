import request from '@/utils/request'

/**
 * 订单搜索
 * @param {Object} params 
 * pageIndex 
 * pageSize
 * orderNo
 * startDate
 * endDate
 * @returns 
 */
export function getOrders(params){
    return request({
      url: "/api/order-service/order/search",
      params
    });
}