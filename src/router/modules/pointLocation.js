/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 19:59:33
 * @LastEditors: sj
 * @LastEditTime: 2022-08-11 00:11:17
 */

import Layout from '@/layout'
export default {
  path: "/node",
  component: Layout,
  redirect: "/node/region",
  name: "Node",
  meta: { title: "点位管理", icon: "node" },
  children: [
    {
      path: "region",
      name: "Region",
      component: () => import("@/views/area"),
      meta: { title: "区域管理" },
    },
    {
      path: "node",
      name: "Point",
      component: () => import("@/views/point"),
      meta: { title: "点位管理"},
    },
    {
      path: "partner",
      name: "Partner",
      component: () => import("@/views/partner"),
      meta: { title: "合作商管理" },
    },
  ],
};
