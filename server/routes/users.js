import Router from 'koa-router'
import Mock from 'mockjs'
import { M_Users } from '../mock'
import * as userController from '../controller/userController' // 引入userController

const router = Router()

// 用户列表
router.get('/users/:id', async (ctx, next) => {
  let values = Mock.mock(M_Users)
  values.user_id = ctx.params.id
  await userController.addOrUpdateUser(ctx, values)
})

export default router
