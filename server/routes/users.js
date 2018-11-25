import Router from 'koa-router'
import Mock from 'mockjs'
import { M_Users } from '../mock'
import * as userController from '../controller/userController' // 引入userController

const router = Router()

// 用户列表
router
  .get('/api/users/:id', async (ctx, next) => {
    await userController.getUserInfo(ctx)
  })
  .get('/api/getUsers', async (ctx, next) => {
    await userController.getUsers(ctx)
  })

export default router
