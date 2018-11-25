'use strict'
import * as userModel from '../model/userModel' // 引入userModel
import { resDataTpl } from './resDataTpl' // 引入返回数据模板
import { UserData } from '../common/utils' // user的Class类

export async function getUsers(ctx) {
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
