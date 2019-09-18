import request from '@/utils/request'

export function getAcodeAge(code) {
  return request({
    url: `/codeAge/${code}`,
    method: 'GET'
  })
}

export function getcodeAges(query) {
  return request({
    url: `/codeAge/`,
    method: 'GET',
    param: query
  })
}

export function updatecodeAge(code, data) {
  return request({
    url: `/codeAge/${code}`,
    method: 'put',
    data
  })
}
