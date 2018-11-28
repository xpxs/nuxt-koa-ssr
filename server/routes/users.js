import Router from 'koa-router'
import Mock from 'mockjs'
import { M_Users } from '../mock'
import * as userController from '../controller/userController' // 引入userController

const router = Router()

router
  //新建用户
  .get('/api/users/:id', async (ctx, next) => {
    let values = Mock.mock(M_Users)
    values.user_id = ctx.params.id
    await userController.addUser(ctx, values)
  })
  //获得用户列表
  .get('/api/getUsers', async (ctx, next) => {
    await userController.getUsers(ctx)
  })
  //更新数据
  .post('/api/updateUser', async (ctx, next) => {
    await userController.updateUser(ctx)
  })
  //登录
  .post('/api/adminLogin', async (ctx, next) => {
    await userController.postUserAuth(ctx)
  })

export default router
