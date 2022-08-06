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
  path: "/sku",
  component: Layout,
  redirect: "/sku/sku-class",
  name: "goods",
  meta: { title: "商品管理", icon: "goods" },
  children: [
    {
      path: "sku-class",
      name: "SkuClass",
      component: () => import("@/views/Goods/goodsType"),
      meta: { title: "商品类型" },
    },
    {
      path: "sku",
      name: "Sku",
      component: () => import("@/views/Goods/goodsControl"),
      meta: { title: "商品管理"},
    },
  ],
};
