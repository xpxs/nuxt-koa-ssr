'use strict'
import * as userModel from '../model/userModel' // 引入userModel
import { resDataTpl } from './resDataTpl' // 引入返回数据模板

export async function getUserInfo(ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const user = await userModel.getUserById(id)
  if (user) {
    resDataTpl.success = true
    resDataTpl.message = '查询成功'
    resDataTpl.data = user
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
export async function addOrUpdateUser(ctx, values) {
  let data = await userModel.addOrUpdateUser(values)
  if (data) {
    resDataTpl.message = '新增更新成功'
  } else {
    resDataTpl.message = '新增更新失败'
  }
  resDataTpl.success = data
  ctx.body = resDataTpl
}

export async function postUserAuth(ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const userInfo = await userModel.getUserByName(data.username) // 数据库返回的数据

  if (!userInfo) {
    resDataTpl.success = false
    resDataTpl.message = '用户不存在'
    resDataTpl.data = null
    ctx.body = resDataTpl
    return
  }
  if (!bcrypt.compareSync(data.password, userInfo.password)) {
    resDataTpl.success = false
    resDataTpl.message = '密码错误'
    resDataTpl.data = null
    ctx.body = resDataTpl
    return
  }
  const userToken = {
    iss: config.userToken.iss,
    name: userInfo.username,
    id: userInfo.id
  }
  const secret = serverConfig.jwtSecret // 指定密钥，这是之后用来判断token合法性的标志
  const token = JWT.sign(userToken, secret) // 签发token
  resDataTpl.success = true
  resDataTpl.message = '登录成功'
  resDataTpl.data = token
  ctx.body = resDataTpl
}
