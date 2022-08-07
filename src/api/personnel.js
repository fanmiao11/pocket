/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-07 10:40:03
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 23:24:42
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
