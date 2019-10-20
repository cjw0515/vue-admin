import request from '@/utils/request'

export function getAdminMenus() {
  const rest = request({
    url: '/adminMenu/',
    method: 'get'
  })
  return rest
}
