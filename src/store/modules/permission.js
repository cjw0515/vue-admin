import { asyncRoutes, constantRoutes } from '@/router'
import { getAdminMenus } from '@/api/admin/admin-menu'

/**
 * 라우트 객체 생성
 * @param routes
 */
function createRoutes(routes, accessedRoutes) {
  const resRoutes = []
  let tmpObj = {}
  routes.forEach(route => {
    accessedRoutes.forEach(accRoute => {
      if (route.name === accRoute.name && route.status) {
        tmpObj = {
          ...accRoute,
          path: route.path,
          name: route.name,
          meta: route.meta
        }

        resRoutes.push(tmpObj)
        if (route.children && accRoute.children) {
          tmpObj['children'] = createRoutes(route.children, accRoute.children)
        }
      }
    })
  })

  return resRoutes
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    console.log('store/permission -> generrate routes')
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      // getAdminMenus().then(({ data }) => {
      //   const routesObjs = createRoutes(data, accessedRoutes)
      //   commit('SET_ROUTES', routesObjs)
      //   resolve(routesObjs)
      // })
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
