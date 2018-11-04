'use strict'
import { getData } from './axios.js'
import { ApiConfig } from './config.js'

export const commonReq = async (key, params) => {
  let result = await getData(ApiConfig[key].url, ApiConfig[key].type, params)
  return result
}
