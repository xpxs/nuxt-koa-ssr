import Router from 'koa-router'
import Mock from 'mockjs'
import JWT from 'jsonwebtoken'
import { M_Users } from '../mock'
import { CONFIG_API } from '../config/CONFIG_API'
import { VeriftyToken } from '../common/utils'
import * as userController from '../controller/userController' // 引入userController

const router = Router()

router
  //新建用户
  .get('/users/:id', async (ctx, next) => {
    let values = Mock.mock(M_Users)
    values.user_id = ctx.params.id
    await userController.addUser(ctx, values)
  })
  //获得用户列表
  .get(CONFIG_API.ENDPOINT_BACKEND_AUTH + '/getUsers', async (ctx, next) => {
    let flag = new VeriftyToken(ctx).getJWTUserToken()
    console.log('flag1111', flag)
    if (flag) {
      await userController.getUsers(ctx)
    }
  })
  //更新数据
  .post(CONFIG_API.ENDPOINT_BACKEND_AUTH + '/updateUser', async (ctx, next) => {
    await userController.updateUser(ctx)
  })
  //后台管理登录
  .post(CONFIG_API.ENDPOINT_BACKEND_AUTH + '/adminLogin', async (ctx, next) => {
    await userController.postUserAuth(ctx)
  })

export default router
