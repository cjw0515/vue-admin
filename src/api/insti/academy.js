import request from '@/utils/request'

export function getAcademies(query) {
  return request({
    url: `/academy/`,
    method: 'GET',
    params: query
  })
}

export function getAAcademy(id) {
  return request({
    url: `/academy/${id}`,
    method: 'GET'
  })
}

export function updateAcademy(id, data) {
  return request({
    url: `/academy/${id}`,
    method: 'PUT',
    data
  })
}

export function addAcademy(data) {
  return request({
    url: `/academy/`,
    method: 'POST',
    data
  })
}
