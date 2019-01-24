import { session } from '@/plugins/utils'
import jwtDecode from 'jwt-decode'

export const getUserFromCookie = req => {
  if (!req.headers.cookie) {
    return
  }
  console.log('req.headers', req.headers)
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

export default function({ store, req }) {
  let isServer = process.server
  // If nuxt generate, pass this middleware
  if (isServer && !req) {
    return
  }
  const loggedUser = isServer ? getUserFromCookie(req) : session('a-user')
  store.dispatch('setUser', loggedUser)
}
