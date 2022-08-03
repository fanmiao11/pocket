/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 14:21:21
 * @LastEditors: sj
 * @LastEditTime: 2022-08-03 14:21:21
 */
export const imgError = {
  inserted: (el, { value }) => {
    el.onerror = function () {
      el.src = value
    }
  }
}
