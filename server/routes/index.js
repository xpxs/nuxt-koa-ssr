import Router from 'koa-router'
import users from './users'

const router = Router()

// 获取用户列表
router.use(users.routes(), users.allowedMethods())

export default router
