/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:08:39
 * @LastEditors: sj
 * @LastEditTime: 2022-08-03 21:10:49
 */
import Layout from '@/layout'
export default {
  path: '/device',
  component: Layout,
  redirect: '/device/area',
  name: 'device',
  meta: { title: '设备管理', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'deviceManagement',
      name: ' deviceManagement',
      component: () => import('@/views/Device/deviceManagement'),
      meta: { title: '设备管理', icon: 'table' }
    },
    {
      path: 'deviceState',
      name: 'deviceState',
      component: () => import('@/views/Device/deviceState'),
      meta: { title: '设备状态', icon: 'tree' }
    },
    {
      path: 'deviceType',
      name: 'deviceType',
      component: () => import('@/views/Device/deviceType'),
      meta: { title: '设备类型管理', icon: 'tree' }
    }
  ]
}
