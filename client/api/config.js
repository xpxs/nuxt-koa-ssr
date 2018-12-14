'use strict'
const ENDPOINT_BACKEND_AUTH = '/oauth/token'
const ENDPOINT_BACKEND_VALIDATE = '/oauth/validate'
export const ApiConfig = {
  getMsg: {
    url: ENDPOINT_BACKEND_AUTH + '/getMsg',
    type: 'get'
  },
  getUsers: {
    url: ENDPOINT_BACKEND_AUTH + '/getUsers',
    type: 'get'
  },
  updateUser: {
    url: ENDPOINT_BACKEND_AUTH + '/updateUser',
    type: 'post'
  },
  adminLogin: {
    url: ENDPOINT_BACKEND_VALIDATE + '/adminLogin',
    type: 'post'
  }
}
