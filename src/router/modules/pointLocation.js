/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 19:59:33
 * @LastEditors: sj
 * @LastEditTime: 2022-08-03 20:06:45
 */

import Layout from '@/layout'
export default {
  path: '/pointLocation',
  component: Layout,
  redirect: '/pointLocation/area',
  name: 'pointLocation',
  meta: { title: '点位管理', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'area',
      name: ' Area',
      component: () => import('@/views/area'),
      meta: { title: '区域管理', icon: 'table' }
    },
    {
      path: 'point',
      name: 'Point',
      component: () => import('@/views/point'),
      meta: { title: '点位管理', icon: 'tree' }
    },
    {
      path: 'partner',
      name: 'Partner',
      component: () => import('@/views/partner'),
      meta: { title: '合作商管理', icon: 'tree' }
    }
  ]
}
