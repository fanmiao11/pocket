/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-30 20:09:42
 * @LastEditors: sj
 * @LastEditTime: 2022-08-01 11:21:29
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user-service/user/login',
    method: 'post',
    data
  })
}

// 图片验证码
export const getCodePic = (clientToken) => request({
  url: `/api/user-service/user/imageCode/${clientToken}`,
  responseType: 'blob'
})
