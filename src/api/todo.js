import request from '@/utils/request'

export function addTodo(data) {
  return request({
    url: '/todo/',
    method: 'post',
    data
  })
}

export function getTodos() {
  return request({
    url: '/todo/',
    method: 'GET'
  })
}

export function deleteTodo(key) {
  return request({
    url: `/todo/${key}`,
    method: 'delete'
  })
}

export function modifyTodo(key, data) {
  return request({
    url: `/todo/${key}`,
    method: 'put',
    data
  })
}
