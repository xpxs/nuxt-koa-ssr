'use strict'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Moment from 'moment'
import * as userModel from '../model/userModel' // 引入userModel
import {
  UserData,
  ResDataTpl,
  CreateToken,
  OverTime,
  RedisToken
} from '../common/utils' // user的Class类
import { CONFIG_API } from '../config/CONFIG_API'
/* 通过token获取JWT的userToken */

export async function getUsers(ctx) {
  let resDataTpl = new ResDataTpl().data()
  // await getJWTUserToken(ctx.headers.authorization, async function(
  //   err,
  //   decoded
  // ) {
  //   if (decoded) {
  //     let time = Moment().valueOf()
  //     if (time > decoded.exp) {
  //       resDataTpl.success = false
  //       resDataTpl.message = 'token已过期，请重新登录'
  //       resDataTpl.data = null
  //       ctx.body = resDataTpl
  //       ctx.status = 401
  //     } else {
  //       let reqOverTime = new OverTime(ctx).reqOverTime()
  //       if (reqOverTime) {
  const pageSize = ctx.query.pageSize ? ctx.query.pageSize * 1 : 10
  const pageNum = ctx.query.pageNum ? ctx.query.pageNum * 1 : 1
  if (isNaN(pageSize) || isNaN(pageNum)) {
    resDataTpl.success = false
    resDataTpl.message = '参数不正确'
    resDataTpl.data = null
    ctx.body = resDataTpl
    return
  }
  const users = await userModel.getUsersCount(pageNum, pageSize)
  let userData = new UserData(users)
  if (users) {
    resDataTpl.success = true
    resDataTpl.message = '查询成功'
    resDataTpl.data = userData.list()
    ctx.body = resDataTpl
  } else {
    resDataTpl.success = false
    resDataTpl.message = '没有符合要求的用户'
    resDataTpl.data = null
    ctx.body = resDataTpl
  }
  // }
  // }
  // }
  // })
}

/**
 * [getUserInfo 查询单个用户信息]
 * @Author   tanpeng
 * @DateTime 2018-11-24
 * @version  [v1.0]
 * @param    {[type]}   ctx [description]
 * @return   {[type]}       [description]
 */
export async function getUserInfo(ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const user = await userModel.getUserById(id)
  let userData = new UserData(user)
  let resDataTpl = new ResDataTpl().data()
  if (user) {
    resDataTpl.success = true
    resDataTpl.message = '查询成功'
    resDataTpl.data = userData.info()
    ctx.body = resDataTpl
  } else {
    resDataTpl.success = false
    resDataTpl.message = '用户不存在'
    resDataTpl.data = null
    ctx.body = resDataTpl
  }
}
/**
 * [addUserInfo 新增用户信息]
 * @Author   tanpeng
 * @DateTime 2018-11-06
 * @version  [v1.0]
 * @param    {[type]}   ctx [koa封装变量]
 */
export async function addUser(ctx, values) {
  let resDataTpl = new ResDataTpl().data()
  values.user_pwd = bcrypt.hashSync('21232f297a57a5a743894a0e4a801fc3', 8)
  let data = await userModel.addUser(values)
  if (data) {
    resDataTpl.message = '新增更新成功'
  } else {
    resDataTpl.message = '新增更新失败'
  }
  resDataTpl.success = data
  resDataTpl.data = null
  ctx.body = resDataTpl
}

export async function updateUser(ctx) {
  let reqParams = ctx.request.body
  let resDataTpl = new ResDataTpl().data()
  let values = {}
  for (let key in reqParams) {
    //驼峰参数换成下划线
    let k = key.replace(/([A-Z])/g, '_$1').toLowerCase()
    values[k] = reqParams[key]
  }
  let data = await userModel.updateUser(values)
  if (data[0] === 1) {
    resDataTpl.message = '更新成功'
    resDataTpl.success = true
  } else {
    resDataTpl.message = '更新失败'
    resDataTpl.success = false
  }
  ctx.body = resDataTpl
}

export async function postUserAuth(ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let resDataTpl = new ResDataTpl().data()
  let captchaUUID = data.captchaUUID
  let captchaCode = data.captchaCode
  let captchaTextInRedis = await new RedisToken().get(captchaUUID)
  if (captchaCode !== captchaTextInRedis) {
    resDataTpl.success = false
    resDataTpl.message = '验证码错误'
    ctx.body = resDataTpl
    return
  }
  const userInfo = await userModel.getUserByName(data.userName) // 数据库返回的数据
  console.log('userInfo', userInfo)
  if (!userInfo) {
    resDataTpl.success = false
    resDataTpl.message = '用户不存在'
    ctx.body = resDataTpl
    return
  }
  if (!bcrypt.compareSync(data.userPwd, userInfo.user_pwd)) {
    resDataTpl.success = false
    resDataTpl.message = '密码错误'
    ctx.body = resDataTpl
    return
  }
  const token = await new CreateToken({
    user_id: userInfo.user_id,
    user_name: userInfo.user_name
  }).token()
  resDataTpl.success = true
  resDataTpl.message = '登录成功'
  resDataTpl.data = token
  ctx.set('Token', token)
  ctx.body = resDataTpl
}
