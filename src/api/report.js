import request from "@/utils/request";

/**
 * 获取一定日期范围之内的合作商分成汇总数据
 * @param {Object} params
 * partnerName 合作商名称
 * start 2020-01-01 开始日期时间
 * end 2020-01-01 结束日期时间
 * pageIndex
 * pageSize
 * @returns promise
 */
export function getpartnercollect(params) {
  return request({
    url: "/api/order-service/report/partnerCollect",
    params,
  });
}

/**
 * 获取一定时间范围之内的分成总数
 * @param {Object} params
 * partnerId 合作商id
 * start 开始日期时间  2020-01-01 12:00:00
 * end 结束日期时间  2020-01-01 12:00:00
 * @returns
 */
export function gettotalBill(params) {
  return request({
    url: "/api/order-service/report/totalBill",
    params,
  });
}

/**
 * 获取一定时间范围之内的收入
 * @param {Object} params
 * partnerId 合作商id
 * start 开始日期时间  2020-01-01 12:00:00
 * end 结束日期时间  2020-01-01 12:00:00
 * innerCode 售货机编号
 * @returns
 */
export function getorderAmount(params) {
  return request({
    url: "/api/order-service/report/orderAmount",
    params,
  });
}

/**
 * 获取一定时间范围之内的订单总数
 * @param {Object} params
 * partnerId 合作商id
 * start 开始日期时间  2020-01-01 12:00:00
 * end 结束日期时间  2020-01-01 12:00:00
 * innerCode 售货机编号 *
 *  @returns
 */
export function getorderCount(params) {
  return request({
    url: "/api/order-service/report/orderCount",
    params,
  });
}
