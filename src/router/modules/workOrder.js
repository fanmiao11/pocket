/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 19:23:07
 * @LastEditors: sj
 * @LastEditTime: 2022-08-03 21:09:22
 */

import Layout from '@/layout'
export default {
  path: "/task",
  component: Layout,
  redirect: "/task/business",
  name: "Task",
  meta: { title: "工单管理", icon: "task" },
  children: [
    {
      path: "business",
      name: "Business",
      component: () => import("@/views/Operation"),
      meta: { title: "运营工单" },
    },
    {
      path: "operation",
      name: "Operation",
      component: () => import("@/views/Maintenance"),
      meta: { title: "运维工单"},
    },
  ],
};
