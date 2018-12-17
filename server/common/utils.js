'use strict'
import JWT from 'jsonwebtoken'
import Moment from 'moment'
import { CONFIG_API } from '../config/CONFIG_API'
export class UserData {
  // 构造
  constructor(data) {
    this.data = data
  }
  list() {
    let obj = {
      rows: [],
      count: ''
    }
    this.data.rows.forEach((value, index) => {
      obj.rows.push({
        userId: value.user_id,
        userName: value.user_name,
        userSex: value.user_sex,
        userPhone: value.user_phone,
        userQQ: value.user_qq,
        userEmail: value.user_email,
        userAddress: value.user_address,
        userFreeze: value.user_freeze,
        userRankId: value.user_rank_id
      })
    })
    obj.count = this.data.count
    return obj
  }
  info() {
    return {
      userId: this.data.user_id,
      userName: this.data.user_name,
      userSex: this.data.user_sex,
      userPhone: this.data.user_phone,
      userQQ: this.data.user_qq,
      userEmail: this.data.user_email,
      userAddress: this.data.user_address,
      userFreeze: this.data.user_freeze,
      userRankId: this.data.user_rank_id
    }
  }
}

export class ResDataTpl {
  data() {
    return {
      success: false,
      message: '',
      data: null
    }
  }
}

export class CreateToken {
  // 构造
  constructor(data) {
    this.data = data
  }
  token() {
    let loginTime = Moment().valueOf()
    const payload = {
      id: this.data.user_id,
      name: this.data.user_name,
      exp: loginTime + 6 * 1000, //过期时间10分钟
      iat: loginTime //登录时间
    }
    const token = JWT.sign(payload, CONFIG_API.SECRET_JWT) // 签发token
    return token
  }
}

export class VeriftyToken {
  // 构造
  constructor(data) {
    this.data = data
    this.resDataTpl = new ResDataTpl().data()
  }
  reqOverTime(userToken) {
    const self = this
    let time = Moment().valueOf()
    let reqTime = self.data.headers['request-time']
    if (time > reqTime) {
      //判断接口请求时间与当前时间
      if (time - reqTime > 10 * 1000) {
        //请求超过10秒报错
        self.resDataTpl.success = false
        self.resDataTpl.message = '请求超时！'
        self.resDataTpl.data = null
        self.data.body = self.resDataTpl
        self.data.status = 500
        return false
      }
      if (userToken.exp - time < 50 * 1000) {
        //5分钟后更新token
        let token = new CreateToken({
          user_id: userToken.id,
          user_name: userToken.name
        }).token()
        self.data.set('Token', token)
      }
      return true
    }
    self.resDataTpl.success = false
    self.resDataTpl.message = '非法请求！请正视你的请求！'
    self.resDataTpl.data = null
    self.data.body = self.resDataTpl
    self.data.status = 500
    return false
  }
  getJWTUserToken() {
    const self = this
    let token = self.data.headers.authorization
    let time = Moment().valueOf()
    try {
      let decoded = JWT.verify(token.split(' ')[1], CONFIG_API.SECRET_JWT)
      if (time > decoded.exp) {
        self.resDataTpl.success = false
        self.resDataTpl.message = 'token已过期，请重新登录'
        self.resDataTpl.data = null
        self.data.body = self.resDataTpl
        self.data.status = 401
        return false
      }
      let flag = self.reqOverTime(decoded)
      if (flag) {
        return true
      }
      return false
    } catch (err) {
      return false
    }
  }
}
