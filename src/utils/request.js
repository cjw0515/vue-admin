import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_AUTH_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const resCode = response.status

    // if the custom code is not 20000, it is judged as an error.
    // console.log('mock code : ', res.code)
    if (Math.floor(resCode / 100) !== 2) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // console.log('code', error.response.status)
    Message({
      message: error.response.data.message || '시스템 에러입니다. 관리자에게 문의해주세요.',
      type: 'error',
      duration: 5 * 1000
    })
    if (error.response.status === 401) {
      removeToken()
      router.push(`/login`)
    }
    return Promise.reject(new Error(error.response.data.message || 'Error'))
  }
)

export default service
