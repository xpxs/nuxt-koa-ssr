import { WEBSITE } from './WEBSITE'
const APP = WEBSITE.name
const API = WEBSITE.api
const BASE_API = WEBSITE.baseApi
const SESS_KEY = WEBSITE.name + ':sess'
const COOKIE_JWT = WEBSITE.name + '_jwt'
const SHOW_EXAMPLES = true
const AXIOS_DEFAULT_TIMEOUT = WEBSITE.timeout
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || '3000'
const LB_ADDR =
  process.env.LB_ADDR || `http://${HOST}:${PORT}` + WEBSITE.baseApi

const ENDPOINT_BACKEND_AUTH = '/oauth/token'
const ENDPOINT_BACKEND_VALIDATE = '/oauth/validate'

const MOCK_ENDPOINT_BACKEND = true

export const CONFIG_API = {
  APP: APP,
  API: API,
  BASE_API: BASE_API,
  SESS_KEY: SESS_KEY,
  COOKIE_JWT: COOKIE_JWT,
  SHOW_EXAMPLES: SHOW_EXAMPLES,
  AXIOS_DEFAULT_TIMEOUT: AXIOS_DEFAULT_TIMEOUT,
  HOST: HOST,
  PORT: PORT,
  LB_ADDR: LB_ADDR,
  ENDPOINT_BACKEND_AUTH: ENDPOINT_BACKEND_AUTH,
  ENDPOINT_BACKEND_VALIDATE: ENDPOINT_BACKEND_VALIDATE,
  MOCK_ENDPOINT_BACKEN: MOCK_ENDPOINT_BACKEND
}
