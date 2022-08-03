/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:26:17
 * @LastEditors: sj
 * @LastEditTime: 2022-08-03 20:27:56
 */


import Layout from '@/layout'
export default {
  path: '/goods',
  component: Layout,
  redirect: '/goods/operation',
  name: 'goods',
  meta: { title: '商品管理', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'goodsType',
      name: 'GoodsType',
      component: () => import('@/views/Goods/goodsType'),
      meta: { title: '商品类型', icon: 'table' }
    },
    {
      path: 'goodsControl',
      name: 'GoodsControl',
      component: () => import('@/views/Goods/goodsControl'),
      meta: { title: '商品管理', icon: 'tree' }
    }
  ]
}
