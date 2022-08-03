/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:43:26
 * @LastEditors: sj
 * @LastEditTime: 2022-08-03 20:43:27
 */

import Layout from '@/layout'
export default {
  path: '/statistics',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/statistics'),
      meta: { title: '统计对账', icon: 'table' }
    }
  ]
}
