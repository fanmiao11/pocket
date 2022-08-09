/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-07 10:04:10
 * @LastEditors: sj
 * @LastEditTime: 2022-08-08 09:01:49
 */
/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-30 20:09:42
 * @LastEditors: sj
 * @LastEditTime: 2022-08-06 22:34:05
 */
import request from "@/utils/request";

/**
 *工单搜索
 * @param {*} params
 * @returns
 */
export function operationSearch(data) {
  return request({
    url: "/api/task-service/task/search",
    method: "get",
    params: data,
  });
}

// 获取工单详情
export const getMoreTask = (taskId) =>
  request({
    url: `/api/task-service/task/taskInfo/${taskId}`,
  });

// 补货详情
export const getBackOrderListApi = (data) =>
  request({
    url: `/api/task-service/taskDetails/${data.taskId}`,
    data,
  });

/**
 * 取消工单
 * @param {String} id 需要一个工单id
 * @returns promise
 */
export const delWorkOrderApi = (id, data) =>
  request({
    url: `/api/task-service/task/cancel/${id}`,
    method: "POST",
    data,
  });

/**
 * 根据售货机获取运营人员列表
 * @param {String} id
 * @returns promise
 */
export const getOperatingPersonnelApi = (id) =>
  request({
    url: `/api/user-service/user/operatorList/${id}`,
    method: "GET",
  });

/**
 * 获取售货机货道详情
 * @param {String} id 需要一个innerCode路径id
 * @returns  promise
 */
export const getVendingMachineAisleApi = (id) =>
  request({
    url: ` /api/vm-service/channel/channelList/${id}`,
    method: "GET",
  });

/**
 * 创建工单
 * @param {Object} data
 * @returns promise
 */
export const addWorkOrderApi = (data) =>
  request({
    url: `/api/task-service/task/create`,
    method: "POST",
    data,
  });

/**
 * 获取工单阈值
 * @param {number} data 
 * @returns promise
 */
 export const getReplenishmentWarningApi = () =>
 request({
   url: `/api/task-service/task/supplyAlertValue`,
   method: "GET",
 });



/**
 * 设置自动补货工单阈值
 * @param {number} data 
 * @returns promise
 */
export const replenishmentWarningApi = (data) =>
  request({
    url: `/api/task-service/task/autoSupplyConfig`,
    method: "POST",
    data,
  });

