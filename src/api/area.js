import request from "@/utils/request";

export function getAreaApi(data) {
  return request({
    url: "/api/vm-service/region/search",
    method: "GET",
    params: data,
  });
}

export function getAreaMoreApi(regionId) {
  return request({
    url: "/api/vm-service/node/search",
    method: "GET",
    params: {
      regionId,
      pageSize: 10,
      pageIndex: 1,
    },
  });
}

export function addAreaApi(data) {
  return request({
    url: "/api/vm-service/region",
    method: "POST",
    data,
  });
}
