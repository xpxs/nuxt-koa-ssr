'use strict'
import { getData } from './axios.js'
import { ApiConfig } from './config.js'

export const commonReq = async (key, params) => {
  let result = ''
  if (ApiConfig[key].type === 'post') {
    result = await getData(ApiConfig[key].url, ApiConfig[key].type, params)
  } else if (ApiConfig[key].type === 'get') {
    let url = '?'
    for (let name in params) {
      url += name + '=' + encodeURIComponent(params[name]) + '&' // 转码并进行赋值
    }
    url = url.substring(0, url.length - 1) // 去掉最后一个&符号

    result = await getData(ApiConfig[key].url + url, ApiConfig[key].type)
  }
  return result
}
