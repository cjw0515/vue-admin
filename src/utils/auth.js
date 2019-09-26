import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const expireTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

export function getToken() {
  // const currentToken = Cookies.get(TokenKey)
  // console.log(getUserInfo())
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log('cookie/set token')
  return Cookies.set(TokenKey, token, { expires: expireTime })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
