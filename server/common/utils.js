'use strict'
import JWT from 'jsonwebtoken'
import Moment from 'moment'
import multer from 'koa-multer'
import { CONFIG_API } from '../config/CONFIG_API'
import Redis from 'redis'
import Bluebird from 'bluebird'
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
//redis
export class RedisToken {
  // 构造
  constructor() {
    // this.redis = new Redis({
    //   host: CONFIG_API.HOST, //安装好的redis服务器地址
    //   port: CONFIG_API.REDIS_PORT, //端口
    //   prefix: CONFIG_API.REDIS_KEY, //存诸前缀
    //   ttl: 60 * 60 * 23, //过期时间
    //   db: 0
    // })
    Bluebird.promisifyAll(Redis.RedisClient.prototype)
    Bluebird.promisifyAll(Redis.Multi.prototype)
    this.redis = Redis.createClient('6379', '127.0.0.1')
    // redis 链接错误
    this.redis.on('error', function(error) {
      console.log('error', error)
    })
  }
  async set(key, value) {
    //存储数据到redis
    let self = this
    let data = await self.redis.setAsync(key, value)
    return data
  }
  async get(key) {
    let self = this
    let data = await self.redis.getAsync(key)
    // console.log('--------getdata-------', data)
    return data
  }
}

export class CreateToken {
  // 构造
  constructor(data) {
    this.data = data
  }
  async token() {
    let loginTime = Moment().valueOf()
    const payload = {
      id: this.data.user_id,
      name: this.data.user_name,
      exp: loginTime + 10 * 60 * 1000, //过期时间10分钟
      iat: loginTime //登录时间
    }
    const token = JWT.sign(payload, CONFIG_API.SECRET_JWT) // 签发token
    // console.log('this.data.user_id', this.data.user_id)
    let data = await new RedisToken().set(this.data.user_id, token)
    // console.log('data-----', data)
    return token
  }
}
export class VeriftyToken {
  // 构造
  constructor(data) {
    this.data = data
    this.resDataTpl = new ResDataTpl().data()
    this.time = Moment().valueOf()
    this.reqTime = data.headers['request-time']
    this.token = data.headers.authorization
  }
  async reqOverTime(userToken) {
    const self = this
    if (self.time > self.reqTime || self.time <= self.reqTime) {
      //判断接口请求时间与当前时间
      // if (self.time - self.reqTime > 10 * 1000) {
      if (self.time < 0) {
        //请求超过10秒报错
        self.resDataTpl.success = false
        self.resDataTpl.message = '请求超时！'
        self.resDataTpl.data = null
        self.data.body = self.resDataTpl
        self.data.status = 500
        return false
      }
      if (userToken.exp - self.time < 5 * 60 * 1000) {
        //5分钟后更新token
        let token = await new CreateToken({
          user_id: userToken.id,
          user_name: userToken.name
        }).token()
        //浏览器端返回token
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
  async getJWTUserToken() {
    const self = this
    let splitToken = self.token.split(' ')[1]
    // console.log('-------splitToken---------', splitToken)
    let decoded = await JWT.verify(splitToken, CONFIG_API.SECRET_JWT)
    let doc = await new RedisToken().get(decoded.id)
    // console.log('-------decoded---------', decoded)
    // console.log('-------doc---------', doc)
    let reqTimeKey = decoded.id + ' reqTime'
    // console.log('-------reqTimeKey---------', reqTimeKey)
    let reqTimeData = await new RedisToken().get(reqTimeKey)
    // console.log('-------reqTimeData---------', reqTimeData)
    //拦截判断接口请求频次
    // if (reqTimeData && self.time - reqTimeData < 1000) {
    if (reqTimeData === null) {
      self.resDataTpl.success = false
      self.resDataTpl.message = '系统繁忙！您接口请求太频繁！'
      self.resDataTpl.data = null
      self.data.body = self.resDataTpl
      self.data.status = 502
      return false
    }
    //增加接口请求频次标记
    let data = await new RedisToken().set(reqTimeKey, self.time)
    if (self.time > decoded.exp || doc === null || doc !== splitToken) {
      self.resDataTpl.success = false
      self.resDataTpl.message = 'token已过期，请重新登录'
      self.resDataTpl.data = null
      self.data.body = self.resDataTpl
      self.data.status = 401
      return false
    }
    let flag = await self.reqOverTime(decoded)
    if (flag) {
      return true
    }
    return false
  }
}

export class Upload {
  constructor() {
    this.filePath = 'client/static/uploads/' + Moment().format('YYYYMMDD')
    this.storage = multer.diskStorage({
      destination: this.filePath,
      filename: function(req, file, cb) {
        let fileFormat = file.originalname.split('.')
        let fileName =
          Moment().valueOf() + '.' + fileFormat[fileFormat.length - 1]
        cb(null, fileName)
      }
    })
  }
  path() {
    return this.filePath
  }
  upload() {
    return multer({ storage: this.storage })
  }
}
