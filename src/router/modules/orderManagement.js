/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:38:56
 * @LastEditors: sj
 * @LastEditTime: 2022-08-03 20:40:38
 */

import Layout from '@/layout'
export default {
  path: '/orderManagement',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/orderManagement'),
      meta: { title: '订单管理', icon: 'table' }
    }
  ]
}
