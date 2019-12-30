import request from '@/utils/request'

export function login(data) {
  console.log('api/login')
  const rest = request({
    url: '/auth/login',
    method: 'POST',
    data
    // baseURL: process.env.VUE_APP_BASE_AUTH_API
  })
  return rest
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'POST'
  })
}
