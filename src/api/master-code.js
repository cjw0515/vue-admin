import request from '@/utils/request'

export function addmasterCode(data) {
  return request({
    url: '/masterCode/',
    method: 'post',
    data
  })
}

export function getAMasterCode(code) {
  return request({
    url: `/masterCode/${code}`,
    method: 'GET'
  })
}

export function getMasterCodes(parentCode, depth) {
  return request({
    url: `/masterCode/childCodes/${parentCode}/depth/${depth}`,
    method: 'GET'
  })
}

export function deletemasterCode(key) {
  return request({
    url: `/masterCode/${key}`,
    method: 'delete'
  })
}

export function modifyMasterCode(code, data) {
  return request({
    url: `/masterCode/${code}`,
    method: 'put',
    data
  })
}
