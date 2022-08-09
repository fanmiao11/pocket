/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-09 14:17:59
 * @LastEditors: sj
 * @LastEditTime: 2022-08-09 14:21:07
 */
//  策略管理
import request from "@/utils/request";

export const getTacticalList = (params) =>
  request({
    url: "/api/vm-service/policy/search",
    params,
  });

  /**
   * 新增策略
   * @param {Object} data 策略名 折扣比例
   * @returns 
   */
export function addpolicy(data){
  return request({
    url: "/api/vm-service/policy",
    method:'POST',
    data:{
      policyName:data.policyName,
      discount:Number(data.discount),
    }
  });
}

/**
 * 修改策略
 * @param {Object} data 策略id 策略名 折扣值
 * @returns
 */

export function editpolicy(data) {
  return request({
    url: `/api/vm-service/policy/${data.policyId}`,
    method: "PUT",
    data: {
      policyName: data.policyName,
      discount: data.discount,
    },
  });
}

/**
 * 删除策略
 * @param {Object} data 策略id 策略名
 * @returns 
 */
export function delpolicy(data){
  return request({
    url: `/api/vm-service/policy/${data.policyId}`,
    method: "DELETE",
    params:{
      pageIndex:data.pageIndex,
      pageSize:data.pageSize,
      policyName:data.policyName
    }
  });
}

/**
 * 根据策略id搜索售货机
 * @param {Object} data 策略id 
 * @returns 
 */
export function getvmlist(data){
  return request({
    url: `/api/vm-service/policy/vmList/${data.policyId}`,
    params:{
      pageIndex:data.pageIndex,
      pageSize:data.pageSize
    }
  });
}