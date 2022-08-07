/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-06 23:42:10
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 10:07:20
 */
import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  loading: false
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  SET_LOADING: (state, payload) => {
    state.loading = payload
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeLoading: ({ commit }, payload) => {
    console.log(11);
    commit('SET_LOADING', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

