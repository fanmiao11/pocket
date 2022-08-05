/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:08:39
 * @LastEditors: sj
 * @LastEditTime: 2022-08-03 20:19:32
 */
import Layout from '@/layout'
export default {
  path: '/personnel',
  component: Layout,
  redirect: '/personnel/area',
  name: 'personnel',
  meta: { title: '人员管理', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'personList',
      name: ' personList',
      component: () => import('@/views/personnel/personList'),
      meta: { title: '人员列表', icon: 'table' }
    },
    {
      path: 'peopleCounting',
      name: 'peopleCounting',
      component: () => import('@/views/personnel/peopleCounting'),
      meta: { title: '人效统计', icon: 'tree' }
    },
    {
      path: 'workList',
      name: 'workList',
      component: () => import('@/views/personnel/workList'),
      meta: { title: '工作量列表', icon: 'tree' }
    }
  ]
}
