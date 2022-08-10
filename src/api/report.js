/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-10 12:03:17
 * @LastEditors: sj
 * @LastEditTime: 2022-08-10 23:02:33
 */
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

/**
 * 获取销售额统计
 * @param {number} collectType 1:按日统计，2:按月统计
 * @param {*} start  2020-01-01 开始日期
 * @param {*} end 2020-01-01	结束日期
 * @returns
 */
export function getamountCollect (collectType, start, end) {
  return request({
    url: `/api/order-service/report/amountCollect/${collectType}/${start}/${end}`,
  });
}

/**
 *  根据地区汇总销售额数据(销售量分布)
 * @param {*} start 2020-01-01 开始日期
 * @param {*} end 2020-01-01	结束日期
 * @returns
 */
export function getregionCollect (start, end) {
  return request({
    url: `/api/order-service/report/regionCollect/${start}/${end}`,
  });
}

/**
 *获取销售前几的商品
 * @param {*} topValue	10	前几的商品
 * @param {*} start  2020-01-01 开始日期
 * @param {*} end  2020-01-01结束日期
 * @returns
 */
export function getskuTop (topValue, start, end) {
  return request({
    url: ` /api/order-service/report/skuTop/${topValue}/${start}/${end}`,
  });
}
