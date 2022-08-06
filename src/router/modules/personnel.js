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
  path: "/user",
  component: Layout,
  redirect: "/user/index",
  name: "User",
  meta: { title: "人员管理", icon: "person" },
  children: [
    {
      path: "index",
      name: " personList",
      component: () => import("@/views/personnel/personList"),
      meta: { title: "人员列表"},
    },
    {
      path: "user-task-stats",
      name: "UserTaskStats",
      component: () => import("@/views/personnel/peopleCounting"),
      meta: { title: "人效统计" },
    },
    {
      path: "user-work",
      name: "UserWork",
      component: () => import("@/views/personnel/workList"),
      meta: { title: "工作量列表"},
    },
  ],
};
