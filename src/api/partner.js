import request from "@/utils/request";

export function getPartnerApi(data) {
  return request({
    url: "/api/user-service/partner/search",
    method: "GET",
    params: data,
  });
}

export function addPartnerApi(data) {
  return request({
    url: "/api/user-service/partner",
    method: "POST",
    data,
  });
}

export function putPartnerApi(id) {
  return request({
    url: "/api/user-service/partner/resetPwd/" + id,
    method: "PUT",
    id,
  });
}

export function editPartnerApi(data) {
  return request({
    url: "/api/user-service/partner/" + data.id,
    method: "PUT",
    data,
  });
}

export function delPartnerApi(id) {
  return request({
    url: "/api/user-service/partner/" + id,
    method: "DELETE",
  });
}
