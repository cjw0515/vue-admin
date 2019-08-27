import request from '@/utils/request'

export function getUserInfo(token) {
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token },
  //   baseURL: process.env.VUE_APP_BASE_API
  // })
  return request({
    url: `/auth/user/${token}`,
    method: 'get',
    params: { token }
  })
}
