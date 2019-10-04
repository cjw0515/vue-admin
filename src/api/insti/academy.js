import request from '@/utils/request'

export function getAcademies(query) {
  return request({
    url: `/academy/`,
    method: 'GET',
    params: query
  })
}

export function updateCodeAge(query, data) {
  return request({
    url: `/codeAge/`,
    method: 'PUT',
    params: query,
    data
  })
}

export function addCodeAge(data) {
  return request({
    url: `/codeAge/`,
    method: 'POST',
    data
  })
}
