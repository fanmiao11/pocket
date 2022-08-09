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
    params: params,
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
export function editskuClass(table) {
  return request({
    url: `/api/vm-service/skuClass/${table.classId}`,
    method: "PUT",
    data: {
      className: table.className,
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
export function getskus(params) {
  return request({
    url: "/api/vm-service/sku/search",
    params,
  });
}

/**
 * 新增商品
 * @param {Object} data
 * skuName String 商品名称
 * skuImage String 商品图片
 * price integer 价格
 * classId integer 类型
 * unit string  规格
 * brandName String  品牌
 * @returns Promise
 */
export function addskus(data) {
  return request({
    url: "/api/vm-service/sku",
    method: "POST",
    data,
  });
}

/**
 * 修改商品
 * @param {Object} data
 * @returns promise
 */
export function editskus(data) {
  return request({
    url: `/api/vm-service/sku/`+data.skuId,
    method: "PUT",
    data: {
      skuName: data.skuName,
      skuImage: data.skuImage,
      price: data.price,
      classId: data.classId,
      unit: data.unit,
      brandName: data.brandName,
      skuId: data.skuId,
    },
  });
}

/**
 * 商品数据导入
 * @param {String} fileName 文件名
 * @returns promise
 */
export function importskus(fileName) {
  return request({
    url: "/api/vm-service/sku/upload",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: fileName,
  });
}

/**
 * 图片上传
 * @param {file} fileName 文件名
 * @returns promise
 */
export function fileupload(fileName) {
  return request({
    url: "/api/vm-service/sku/fileUpload",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: fileName,
  });
}
