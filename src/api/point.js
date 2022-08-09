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

export function addAreaApi(data) {
  return request({
    url: "/api/vm-service/region",
    method: "POST",
    data,
  });
}

export function getAreaIdApi(id) {
  return request({
    url: "/api/vm-service/region/" + id,
  });
}

export function editAreaApi(data) {
  return request({
    url: "/api/vm-service/region/" + data.id,
    method: "PUT",
    data,
  });
}

export function delAreaApi(id) {
  return request({
    url: "/api/vm-service/node/" + id,
    method: "DELETE",
  });
}
