import request from "@/utils/request";

/**
 * 商品类型搜索
 * @param {Object} params 
 * pageIndex
 * pageSize 
 * className 商品名称
 * @returns Promise
 */
export function getskuClass(params) {
  return request({
    url: "/api/vm-service/skuClass/search",
    params:params
  });
}

/**
 * 新增商品类型
 * @param {String} className 类型名 
 * @returns Promise
 */
export function addskuClass(className) {
  return request({
    url: "/api/vm-service/skuClass",
    method: "POST",
    data: {
      className,
    },
  });
}

/**
 * 修改商品类型
 * @param {Object} table 商品类型id  商品类型名称
 * @returns 
 */
export  function editskuClass(table){
    return request({
      url: `/api/vm-service/skuClass/${table.classId}`,
      method: "PUT",
      data: {
        className: table.className
      },
    });
}

/**
 * 删除商品类型
 * @param {*} classId 
 * @returns 
 */
export function delskuClass(classId) {
  return request({
    url: `/api/vm-service/skuClass/${classId}`,
    method: "DELETE",
  });
}

/**
 * 获取商品数据
 * @param {Object} params 
 * pageIndex
 * pageSize
 * skuName 商品名称
 * classId 商品类别id
 * @returns 
 */
export function getskus(params){
    return request({
      url: "/api/vm-service/sku/search",
      params
    });
}