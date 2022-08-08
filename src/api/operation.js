/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-07 10:04:10
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 10:04:10
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
