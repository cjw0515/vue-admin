import request from '@/utils/request'

export function getAMasterCode(code) {
  return request({
    url: `/masterCode/${code}`,
    method: 'GET'
  })
}

export function getAMasterCodeTree(code) {
  return request({
    url: `/masterCode/tree/${code}`,
    method: 'GET'
  })
}

export function getMasterCodes(parentCode, depth) {
  return request({
    url: `/masterCode/childCodes/${parentCode}/depth/${depth}`,
    method: 'GET'
  })
}

export function updateMasterCode(code, data) {
  return request({
    url: `/masterCode/${code}`,
    method: 'put',
    data
  })
}
