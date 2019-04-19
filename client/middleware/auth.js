import { session } from '@/plugins/utils'
import jwtDecode from 'jwt-decode'
export const getUserFromCookie = req => {
  if (!req.headers.cookie) {
    return
  }
  const jwtCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) {
    return
  }
  const jwt = jwtCookie.split('=')[1]
  // console.log('jwtDecode(jwt)', jwtDecode(jwt))
  return jwtDecode(jwt)
}

export default function({ store, req, route, redirect }) {
  let isServer = process.server
  // If nuxt generate, pass this middleware
  if (
    isServer &&
    req.headers.cookie &&
    req.headers.cookie.indexOf('jwt=') === -1
  ) {
    return redirect('/admin/login')
  }
  const loggedUser = isServer ? getUserFromCookie(req) : session('a-user')
  if (route.path === '/admin/login' && loggedUser) {
    return redirect('/admin')
  }
  store.dispatch('setUser', loggedUser)
}
