/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-30 20:09:42
 * @LastEditors: sj
 * @LastEditTime: 2022-08-02 23:39:45
 */
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器  config 当前请求的配置
service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  const token = store.state.user.token.token
  if (token) {
    // 如果token存在 注入token
    config.headers['Authorization'] = `${token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((res) => {
  console.log(res);
  if (res.config.url === '/api/user-service/user/login') {
    const { success, msg, token } = res.data
    if (success) return res.data
    Message(msg)
    return Promise.reject(new Error(msg))
  }

  return res.data

}, function (err) {
  Message.error('系统异常')
  return Promise.reject(err)
})
export default service
