/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-30 20:09:42
 * @LastEditors: sj
 * @LastEditTime: 2022-08-06 00:24:53
 */
import request from '@/utils/request'

/**
 *工单搜索
 * @param {*} params
 * @returns
 */
export function operationSearch (data) {
  return request({
    url: '/api/task-service/task/search',
    method: 'get',
    params: data
  })
}

export const getMoreTask = (taskId) => request({
  url: `/api/task-service/task/taskInfo/${taskId}`
})
