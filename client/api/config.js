'use strict'
const oauth = '/oauth'
export const ApiConfig = {
  getMsg: {
    url: '/getMsg',
    type: 'get'
  },
  getCaptcha: {
    url: '/getCaptcha',
    type: 'get'
  },
  checkCaptcha: {
    url: '/checkCaptcha',
    type: 'get'
  },
  getUsers: {
    url: oauth + '/getUsers',
    type: 'get'
  },
  updateUser: {
    url: oauth + '/updateUser',
    type: 'post'
  },
  adminLogin: {
    url: oauth + '/adminLogin',
    type: 'post'
  }
}
