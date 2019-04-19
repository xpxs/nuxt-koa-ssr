import axios from 'axios'
import { catchError, session } from '@/plugins/utils'
import { BASE } from './URL'
import vue from 'vue'
import Moment from 'moment'
// 定义fetch函数，config为配置
export const fetch = config => {
  // 返回promise对象
  return new Promise((resolve, reject) => {
    // 创建axios实例，把基本的配置放进去
    const instance = axios.create({
      // 定义请求文件类型
      headers: {
        'Content-Type': 'application/json'
      },
      // 请求超时
      timeout: 6000,
      // 定义请求根目录
      baseURL: BASE.URL
    })
    instance.interceptors.request.use(
      config => {
        let token = session('a-token')
        config.headers = {}
        config.headers['Request-Time'] = Moment().valueOf()
        if (token) {
          // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.authorization = `Bearer ${token}`
        }
        return config
      },
      err => {
        return Promise.reject(err)
      }
    )
    // 错误处理
    instance.interceptors.response.use(response => {
      //返回拦截获取token
      let token = response.headers.token
      if (token) {
        session('a-token', token)
        vue.prototype.$vueCookies.set('jwt', token, 10 * 60 * 1000)
      }
      return response
    }, catchError)
    // 请求成功后执行的函数
    instance(config)
      .then(res => {
        // console.log(res)
        resolve(res)
        // 失败后执行的函数
      })
      .catch(err => {
        console.log('err', err)
        reject(err)
      })
  })
}

// 封装调用的接口 getData
export const getData = (
  url = '/api/data',
  type = 'post',
  data = {},
  headers
) => {
  return fetch({
    // 这里的url为baseURL下接口地址，如baseURL为'www.baidu.com',接口地址为'www.baidu.com/api/getdata',那么url里就写'api/getdata'
    url: url,
    method: type,
    data: data,
    headers: headers
  })
}
