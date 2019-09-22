import request from '@/utils/request'

export function getcodeAges(query) {
  return request({
    url: `/codeAge/`,
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
