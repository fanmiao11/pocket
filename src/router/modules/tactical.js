/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:33:37
 * @LastEditors: sj
 * @LastEditTime: 2022-08-03 20:35:54
 */

import Layout from '@/layout'
export default {
  path: '/tactical',
  component: Layout,
  name: 'device',
  meta: { title: '设备管理', icon: 'el-icon-s-help' },
  children: [
    {
      path: '',
      component: () => import('@/views/tactical'),
      meta: { title: '策略管理', icon: 'table' }
    }
  ]
}
