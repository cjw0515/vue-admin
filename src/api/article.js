import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query,
    baseURL: process.env.VUE_APP_BASE_API
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id },
    baseURL: process.env.VUE_APP_BASE_API
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv },
    baseURL: process.env.VUE_APP_BASE_API
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API
  })
}
