import request from "@/utils/request";

export function getAreaApi(data) {
  return request({
    url: "/api/vm-service/node/search",
    method: "GET",
    params: data,
  });
}

export function getPointApi(id) {
  return request({
    url: "/api/vm-service/node/vmList/" + id,
    method: "GET",
    params: id,
  });
}

export function PutPointApi(data) {
  return request({
    url: "/api/vm-service/node/" + data.id,
    method: "PUT",
    data,
  });
}

export function addPointApi(data) {
  return request({
    url: "/api/vm-service/node",
    method: "POST",
    data,
  });
}

export function delAreaApi(id) {
  return request({
    url: "/api/vm-service/node/" + id,
    method: "DELETE",
  });
}
// 区域
export function getregion(data) {
  return request({
    url: "/api/vm-service/region/search",
    method: "GET",
    params: data,
  });
}
// 商圈

export function getbusiness() {
  return request({
    url: "/api/vm-service/businessType",
    method: "GET",
  });
}

// 合作商
export function getowner(data) {
  return request({
    url: "/api/user-service/partner/search",
    method: "GET",
    params: data,
  });
}
