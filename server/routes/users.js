import Router from 'koa-router'
import * as userController from '../controller/userController' // 引入userController

const router = Router()

// 用户列表
router.get('/users/:id', async (ctx, next) => {
  await userController.getUserInfo(ctx)
  next()
})

export default router
