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
  path: "/vm",
  component: Layout,
  redirect: "/vm/index",
  name: "device",
  meta: { title: "设备管理", icon: "device" },
  children: [
    {
      path: "index",
      name: " deviceManagement",
      component: () => import("@/views/Device/deviceManagement"),
      meta: { title: "设备管理" },
    },
    {
      path: "status",
      name: "Status",
      component: () => import("@/views/Device/deviceState"),
      meta: { title: "设备状态" },
    },
    {
      path: "type",
      name: "Type",
      component: () => import("@/views/Device/deviceType"),
      meta: { title: "设备类型管理"},
    },
  ],
};
