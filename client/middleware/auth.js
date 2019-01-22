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
  return jwtDecode(jwt)
}

export const getUserFromLocalStorage = () => {
  const json = window.localStorage.user
  return json ? JSON.parse(json) : undefined
}

export default function({ store, req }) {
  console.log('-------req-------', req)
  let isServer = process.server
  // If nuxt generate, pass this middleware
  if (isServer && !req) {
    return
  }
  const loggedUser = isServer
    ? getUserFromCookie(req)
    : getUserFromLocalStorage()
  store.commit('SET_USER', loggedUser)
}
