/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-09 14:17:59
 * @LastEditors: sj
 * @LastEditTime: 2022-08-09 14:21:07
 */
//  策略管理
import request from '@/utils/request'


export const getTacticalList = (params) => request({
  url: '/api/vm-service/policy/search',
  params
})
