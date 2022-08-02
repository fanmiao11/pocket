/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-30 20:09:42
 * @LastEditors: sj
 * @LastEditTime: 2022-08-02 23:42:09
 */
import { getUserInfo, login } from '@/api/user'
import { Message } from 'element-ui'
import router from '@/router'
export default {
  namespaced: true,
  state: {
    token: {},
    userInfo: {}
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload

    },
    setUserInfo (state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async getToken ({ commit }, payload) {
      const data = await login(payload)
      commit('setToken', data)
        router.push({ path: '/dashboard' })
      Message('登陆成功')
    },
    async getUserInfo ({ commit, state }, payload) {
      console.log(state.token.userId);
      const userInfo = await getUserInfo(state.token.userId)
      commit('setUserInfo', userInfo)
    }
  },
  getters: {

  }
}
