/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-30 20:09:42
 * @LastEditors: sj
 * @LastEditTime: 2022-08-01 13:35:41
 */
import { login } from '@/api/user'
import { Message } from 'element-ui'
import router from '@/router'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    async getToken ({ commit }, payload) {
      const { data } = await login(payload)
      if (data.success) {
        commit('setToken', data.token)
        router.push({ path: '/dashboard' })
        Message(data.msg)
      } else {
        Message(data.msg)
      }




    }
  },
  getters: {

  }
}
