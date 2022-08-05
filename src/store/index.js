/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-30 20:09:42
 * @LastEditors: sj
 * @LastEditTime: 2022-08-04 10:49:48
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

import createVuexPersisted from 'vuex-persistedstate' // vuex持久化
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  plugins: [
    createVuexPersisted({
      reducer (state) {
        // 指定存储某个模块的数据
        return {
          user: state.user
        }
      }
    })
  ]
})

export default store
