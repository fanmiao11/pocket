/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-30 20:09:42
 * @LastEditors: sj
 * @LastEditTime: 2022-08-02 23:04:47
 */
import router from '@/router'
import store from '@/store'

const whitelist = ['/login', '/404']
router.beforeEach((to, from, next) => {

  const token = store.state.user.token.token

  if (token) {
    if (!store.state.user.userInfo.userId) {
      // 获取用户信息
      store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') return next('/')
    next()
  } else {
    const isClouds = whitelist.includes(to.path)
    if (isClouds) return next()
    next('/login')
  }
})
