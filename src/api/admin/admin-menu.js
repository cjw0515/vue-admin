import request from '@/utils/request'

export function getAdminMenus() {
  const rest = request({
    url: '/adminMenu/',
    method: 'GET'
  })
  return rest
}

export function getAmenu(id) {
  return request({
    url: `/adminMenu/${id}`,
    method: 'GET'
  })
}

export function updateMenu(data) {
  return request({
    url: `/adminMenu/${data.id}`,
    method: 'PUT',
    data
  })
}

export function addMenu(data) {
  return request({
    url: `/adminMenu/`,
    method: 'POST',
    data
  })
}
