import { asyncRoutes, constantRoutes } from '@/router'
import {
  getRoutes,
  getRoles,
  addRole,
  deleteRole,
  updateRole
} from '@/api/admin/role'

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
      // ===============테스트 ===================
      getRoutes().then(res => {
        console.log('test')
        const data = res.data
        const asyncRoutes2 = []

        data.forEach(element => {
          const tmpRoute = {
            path: element.path,
            component: () => import(`@${element.component}`),
            redirect: element.redirect,
            name: element.name,
            children: [
              {
                path: 'index',
                component: () => import('@/views/todolist/index'),
                name: 'Todolist',
                meta: { title: 'Todolist', icon: 'list', roles: ['viewer'] }
              }
            ]
          }
          asyncRoutes2.push(tmpRoute)
          console.log(element.path)
        })
        accessedRoutes = asyncRoutes2
        commit('SET_ROUTES', accessedRoutes)
        console.log(accessedRoutes)
        resolve(accessedRoutes)
      })
      // ===============테스트 ===================
      // commit('SET_ROUTES', accessedRoutes)
      // console.log(accessedRoutes)
      // resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
