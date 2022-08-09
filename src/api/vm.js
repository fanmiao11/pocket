import request from "@/utils/request";

/**
 * 搜索售货机(售货机列表)
 * @param {Object} params
 * @returns
 */
export const getSearchList = (params) => {
  return request({
    url: "/api/vm-service/vm/search",
    params,
  });
};

/**
 * 售货机类型列表(搜索)
 * @param {Object} params
 * @returns
 */
export const getTypeList = (params) => {
  return request({
    url: "/api/vm-service/vmType/search",
    params,
  });
};

/**
 * 获取售货机维修次数
 * @param {String} innerCode
 * @param {String} start
 * @param {String} end
 * @returns
 */
export const getRepairCount = (innerCode, start, end) => {
  return request({
    url:
      "/api/task-service/task/repairCount/" +
      innerCode +
      "/" +
      start +
      "/" +
      end,
  });
};

/**
 * 获取售货机补货次数
 * @param {String} innerCode
 * @param {String} start
 * @param {String} end
 * @returns
 */
export const getSupplyCount = (innerCode, start, end) => {
  return request({
    url:
      "/api/task-service/task/supplyCount/" +
      innerCode +
      "/" +
      start +
      "/" +
      end,
  });
};

/**
 * 获取售货机商品销量
 * @param {String} innerCode
 * @param {String} start
 * @param {String} end
 * @returns
 */
export const getSkuCollect = (innerCode, start, end) => {
  return request({
    url:
      "/api/order-service/report/skuCollect/" +
      innerCode +
      "/" +
      start +
      "/" +
      end,
  });
};

/**
 * 获取售货机销售额
 * @param {String} innerCode
 * @param {String} start
 * @param {String} end
 * @returns
 */
export const getOrderAmount = (innerCode, start, end) => {
  return request({
    url: "/api/order-service/report/orderAmount",
    params: {
      innerCode,
      start,
      end,
    },
  });
};

const formData = new FormData();
/**
 * 上传头像
 * @param {Object} file
 * @returns
 */
export const imgUpload = (file) => {
  formData.append("fileName", file);
  return request({
    url: "/api/vm-service/sku/fileUpload",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * 新增售货机类型
 * @param {Object} data
 * @returns
 */
export const addVmType = (data) => {
  return request({
    url: "/api/vm-service/vmType",
    method: "post",
    data,
  });
};

/**
 * 售货机类型修改
 * @param {String} typeId
 * @returns
 */
export const changeVmType = (data) => {
  return request({
    url: "/api/vm-service/vmType/" + data.typeId,
    method: "put",
    data,
  });
};

/**
 * 售货机类型删除
 * @param {String} data
 * @returns
 */
export const delVmType = (data) => {
  return request({
    url: "/api/vm-service/vmType/" + data,
    method: "DELETE",
  });
};

/**
 * 新增售货机
 * @param {Object} data
 * @returns promise
 */
export const addVm = (data) =>
  request({
    url: "/api/vm-service/vm",
    data,
    method: "post",
  });

/**
 * 点位搜索(用来获取所有点位)
 * @returns
 */
export const searchNode = () => {
  return request({
    url: "/api/vm-service/node/search",
    params: {
      pageIndex: 1,
      pageSize: 100000,
    },
  });
};

/**
 * 策略列表
 * @returns
 */
export const getPolicyList = () => {
  return request({
    url: "/api/vm-service/policy",
  });
};

export const applyPolicy = (innerCodeList, policyId) => {
  return request({
    url: "/api/vm-service/vm/applyPolicy",
    method: "put",
    data: {
      innerCodeList,
      policyId,
    },
  });
};
