'use strict'
const oauth = '/oauth'
export const ApiConfig = {
  getMsg: {
    url: '/getMsg',
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
