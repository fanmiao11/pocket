/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-07 10:40:03
 * @LastEditors: sj
 * @LastEditTime: 2022-08-09 13:46:34
 */
//  人员管理
import request from '@/utils/request'

/**
 * 人员管理列表
 * @param {*} params 页码数 页数等
 * @param {*} data
 * @returns
 */
export const getUserList = (params, data) => request({
  url: '/api/user-service/user/search',
  data,
  params
})

/**
 * 角色列表
 * @param {*} data
 * @returns
 */
export const getRoleList = (data) => request({
  url: '/api/user-service/role',
  data
})

//  获取地区列表
export const getAreaList = (params) => request({
  url: '/api/vm-service/region/search',
  params
})

// 图片上传
const formData = new FormData()
export const imgUpload = (file) => {
  formData.append('fileName', file)
  return request({
    url: '/api/vm-service/sku/fileUpload',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 删除人员
export const deluserInfo = (id) => request({
  url: `/api/user-service/user/${id}`,
  method: 'DELETE',
})

// 修改人员
export const editUserInfo = (data) => request({
  url: `/api/user-service/user/${data.id}`,
  method: 'PUT',
  data
})

//新增人员
export const addUserInfo = (data) => request({
  url: '/api/user-service/user',
  method: 'POST',
  data
})

// 人员工作量列表
export const getUserWorkList = (params, data) => request({
  url: '/api/user-service/user/searchUserWork',
  params,
  data
})


// 获取用户工作量
/**
 *
 * @param {Object} params
 *    userId 用户ID
 *   start  2020-10-01 00:00:00
 *   end   2020-10-31 00:00:00
 * @returns
 */
export const getUserWork = (params) => request({
  url: '/api/task-service/task/userWork',
  params
})

//获取用户基本信息
export const getuserInfo = (id) => request({
  url: `/api/user-service/user/${id}`,
})

// 获取当时工单汇总信息(人员统计头部信息)
export const getHeaderInfo = (start, end) => request({
  url: `/api/task-service/task/taskReportInfo/${start}/${end}`,
})

// 人员排名
/**
 *
 * @param {*} start
 * @param {*} end
 * @param {*} isRepair  true：运维工单;false：运营工单
 * @param {*} regionId 地区ID
 * @returns
 */
export const getToTen = (start, end, isRepair, regionId) => request({
  url: `/api/task-service/task/userWorkTop10/${start}/${end}/${isRepair}/${regionId}`,
})

// 工单状态统计
export const getCollectReport = (start, end) => request({
  url: `/api/task-service/task/collectReport/${start}/${end}`,
})
