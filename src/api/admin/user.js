import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: `/auth/user`,
    method: 'get'
  })
}
